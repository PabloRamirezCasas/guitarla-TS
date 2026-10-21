import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/guitarla-TS/', // ⚠️ Reemplaza por el nombre exacto de tu repositorio en GitHub
})
