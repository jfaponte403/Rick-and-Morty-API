import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://jfaponte403.github.io/Rick-and-Morty-API/',
  plugins: [react()],
})
