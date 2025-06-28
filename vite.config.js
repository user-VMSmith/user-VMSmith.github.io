import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5177, // ← change this to your desired port
//   },
// })
export default defineConfig({
  base: './',
  plugins: [react()],
});