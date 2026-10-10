import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-unilink',
    copyPublicDir: false,
    assetsDir: 'unilink-assets',
    rollupOptions: { input: 'unilink.html' },
  },
})
