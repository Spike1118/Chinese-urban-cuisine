import { defineConfig } from 'vite'
import vue from '@vuejs/vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true
  },
  // 👇 就加这一行！必须加！
  base: '/Chinese-urban-cuisine/'
})
