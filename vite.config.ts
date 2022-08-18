import { resolve } from "path";
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts'
import packageJson from "./package.json";

module.exports = defineConfig(({ mode }) => {
  const isProd = mode === 'development'
  return {
    base: "./",
    define: {
      __DEV__: isProd
    },
    build: {
      outDir: resolve(__dirname, 'dist'),
      emptyOutDir: true,
      sourcemap: true,
      lib: {
        name: 'fetchin',
        entry: resolve(__dirname, "src/index.ts"),
        formats: ["es", "cjs", "iife"],
        fileName: (format) => `index${format === 'es' ? '.mjs' : '.cjs'}`
      },
    },
    plugins: [
      dts({
        rollupTypes: isProd,
        copyDtsFiles: false,
        beforeWriteFile: (filePath, content) => {
          return { filePath, content }
        },
      })
    ]
  }
});
