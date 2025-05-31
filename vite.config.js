import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from 'tailwindcss' // Импорт Tailwind CSS
import autoprefixer from 'autoprefixer' // Импорт Autoprefixer

export default defineConfig({
  base: './',
  plugins: [vue(), vueDevTools()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer], // Подключение Tailwind CSS и Autoprefixer для обработки CSS
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
