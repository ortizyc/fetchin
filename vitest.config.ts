import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.{spec,test}.ts'],
    coverage: {
      include: ['src/**/*.ts', '!src/locale'],
      reporter: ['text', 'lcov'],
      statements: 90,
    },
  },
})
