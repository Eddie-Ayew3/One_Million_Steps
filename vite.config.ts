import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Adjust the path to your assets as needed
      '@assets': '/src/assets'
    }
  },
  // Optional: If you need to specify PostCSS config path
  css: {
    postcss: './postcss.config.cjs' // or .js if using ESM
  }
})