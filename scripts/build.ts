import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import parseArgs, { type ParsedArgs } from 'minimist'
import execa from 'execa'
import { build as _build } from 'vite'
import dts from 'vite-plugin-dts'

import { removeDir } from './utils'
import { InlineConfig } from 'vite'

export type BuildMode = 'development' | 'production'
export type BuildArgs = ParsedArgs & {
  mode: BuildMode
  watch: boolean
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const ROOT_DIR = resolve(__dirname, '..')

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2), {
    default: { mode: 'production', watch: false },
  }) as BuildArgs

  // clear dist/
  removeDir(resolve(ROOT_DIR, 'dist'))

  // build
  if (args.mode === 'development') {
    await buildMain(args)
  } else {
    // check types in production mode build before
    checkTypes()
    // Cannot compile main and locale in parallel,
    // there is a type declaration output file with duplicate name before type merging,
    // which will cause an error
    await buildMain(args)
    await buildLocale(args)
  }
  console.log('Build successful!')
}

// build main package
export async function buildMain(args: BuildArgs) {
  const buildConfig = genBuildConfig(
    {
      name: 'fetchin',
      entry: resolve(ROOT_DIR, 'src/index.ts'),
      outDir: resolve(ROOT_DIR, 'dist'),
    },
    args,
  )
  await _build(buildConfig)
}

// build locale sub package
export async function buildLocale(args: BuildArgs) {
  const buildConfig = genBuildConfig(
    {
      name: 'fetchinLocale',
      entry: resolve(ROOT_DIR, 'src/locale/index.ts'),
      outDir: resolve(ROOT_DIR, 'dist/locale'),
    },
    args,
  )
  await _build(buildConfig)
}

/**
 * run typescript types check
 * tsc --noEmit
 */
export function checkTypes() {
  execa.commandSync('tsc --noEmit', { stdio: 'inherit' })
}

type GenBuildConfigOptions = {
  name: string
  entry: string
  outDir: string
}

function genBuildConfig(options: GenBuildConfigOptions, args: BuildArgs): InlineConfig {
  const { name, entry, outDir } = options
  const { mode, watch } = args
  const isProd = mode === 'production'
  return {
    root: ROOT_DIR,
    define: {
      __DEV__: isProd,
    },
    build: {
      outDir: outDir,
      watch: watch ? {} : null,
      sourcemap: false,
      lib: {
        name,
        entry,
        formats: ['es', 'cjs'],
        fileName: (format) => `index${format === 'es' ? '.js' : '.cjs'}`,
      },
    },
    plugins: [
      dts({
        rollupTypes: isProd,
        insertTypesEntry: true,
        copyDtsFiles: false,
        beforeWriteFile: (filePath, content) => ({ filePath, content }),
      }),
    ],
  }
}
