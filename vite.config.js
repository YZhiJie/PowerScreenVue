import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      // https://cn.vitejs.dev/guide/assets.html#new-url-url-import-meta-url
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
