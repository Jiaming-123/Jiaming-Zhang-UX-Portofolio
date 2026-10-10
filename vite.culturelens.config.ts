import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Compatibility build for the newer deployed shell, whose source is not in this checkout.
// Reuse its React runtime and Footer; never replace the live homepage/Crownlands bundle.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-culturelens',
    copyPublicDir: false,
    lib: { entry: 'src/pages/CultureLensCaseStudy.tsx', formats: ['es'], fileName: 'culturelens-case-study' },
    rollupOptions: {
      external: id => id === 'react' || id === 'react/jsx-runtime' || /\/components\/Layout$/.test(id),
      output: { paths: () => './culturelens-runtime.js', assetFileNames: 'culturelens-case-study.[ext]' },
    },
  },
})
