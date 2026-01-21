import { defineConfig } from 'vitest/config'
import path from 'path'


export default defineConfig({
  plugins: [require('@vitejs/plugin-react')()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})