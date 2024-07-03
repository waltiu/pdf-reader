import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path,{ resolve } from "path"
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/pdf/index.tsx'),
      name:'book-reader',
      fileName: 'index',
    }
  },
  plugins: [react(),dts({ rollupTypes: true })],
})
