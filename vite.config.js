

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
// https://stackoverflow.com/a/71618444
// https://vitejs.dev/config/
export default defineConfig({
  server: { https: false },
  plugins: [react(),mkcert()],
  base: '/'
})