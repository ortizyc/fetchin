import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig(({ mode }) => {
  return {
    build: {
      outDir: resolve(__dirname, 'dist'),
      sourcemap: false,
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        formats: ['es', 'cjs'],
        fileName: (format) => `index${format === 'es' ? '.js' : '.cjs'}`,
      },
      rollupOptions: {},
    },
    plugins: [
      dts({
        rollupTypes: mode === 'production',
        insertTypesEntry: true,
        copyDtsFiles: false,
        beforeWriteFile: (filePath, content) => ({ filePath, content }),
      }),
    ],
  }
})
