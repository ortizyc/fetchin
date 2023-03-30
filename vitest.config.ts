import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['packages/**/*.{spec,test}.ts'],
    coverage: {
      include: ['packages/**/*.ts'],
      reporter: ['text', 'lcov'],
      statements: 90,
    },
  },
})
