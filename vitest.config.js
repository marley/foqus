import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // Same as vite.config.js — vue-i18n JIT avoids new Function (MV3 CSP).
  define: {
    __INTLIFY_JIT_COMPILATION__: true,
  },
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./test/setup.js'],
    include: ['src/**/*.{test,spec}.{js,mjs}', 'test/**/*.{test,spec}.{js,mjs}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{js,vue}'],
      exclude: [
        '**/*.spec.js',
        '**/*.test.js',
        '**/node_modules/**',
        'dist/**',
      ],
    },
  },
})
