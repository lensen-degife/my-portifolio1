import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  // Vercel sets VERCEL=1, GitHub Pages / Actions does not
  base: process.env.VERCEL ? '/' : '/my-portifolio1/',
})