import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4748,
    proxy: {
      '/api': 'http://127.0.0.1:4747'
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
