import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test-setup.ts'],
    include: ['ui-platform/*/src/**/*.test.{ts,tsx}', 'domains/*/src/**/*.test.{ts,tsx}'],
  },
})
