import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['pdfjs-dist'] // 🚀 Loại trừ pdfjs-dist khỏi tối ưu hóa
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@ "bootstrap/scss/bootstrap" as *;`
  //     },
  //   },
  // },
  scss: {
    additionalData: `@forward "./src/assets/styles/_variables.scss";`
}
})
