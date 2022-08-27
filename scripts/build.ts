import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import parseArgs, { type ParsedArgs } from 'minimist'
import execa from 'execa'
import { build as _build } from 'vite'
import dts from 'vite-plugin-dts'

import { removeDir } from './utils'

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
    await buildMain(args.mode, args.watch)
  } else {
    // check types in production mode
    checkTypes()
    // 不能并行编译 main 和 locale，在类型合并前存在重复名称的类型声明输出文件，会导致出错
    await buildMain(args.mode, args.watch)
    await buildLocale(args.mode)
  }
  console.log('Build successful!')
}

// build main package
export async function buildMain(mode: BuildMode, watch: boolean) {
  const isProd = mode === 'production'
  await _build({
    root: ROOT_DIR,
    define: {
      __DEV__: isProd,
    },
    build: {
      watch: watch ? {} : null,
      outDir: resolve(ROOT_DIR, 'dist'),
      sourcemap: false,
      lib: {
        name: 'fetchin',
        entry: resolve(ROOT_DIR, 'src/index.ts'),
        formats: ['es', 'cjs'],
        fileName: (format) => `index${format === 'es' ? '.js' : '.cjs'}`,
      },
    },
    plugins: [
      dts({
        rollupTypes: isProd,
        insertTypesEntry: true,
        copyDtsFiles: false,
        beforeWriteFile: (filePath, content) => {
          return { filePath, content }
        },
      }),
    ],
  })
}

// build locale sub package
export async function buildLocale(mode: BuildMode) {
  const isProd = mode === 'production'
  await _build({
    root: ROOT_DIR,
    define: {
      __DEV__: isProd,
    },
    build: {
      outDir: resolve(ROOT_DIR, 'dist/locale'),
      sourcemap: false,
      lib: {
        name: 'fetchinLocale',
        entry: resolve(ROOT_DIR, 'src/locale/index.ts'),
        formats: ['es', 'cjs'],
        fileName: (format) => `index${format === 'es' ? '.js' : '.cjs'}`,
      },
    },
    plugins: [
      dts({
        rollupTypes: isProd,
        insertTypesEntry: true,
        copyDtsFiles: false,
        beforeWriteFile: (filePath, content) => {
          return { filePath, content }
        },
      }),
    ],
  })
}

/**
 * run typescript types check
 * tsc --noEmit
 */
export function checkTypes() {
  execa.commandSync('tsc --noEmit', { stdio: 'inherit' })
}
