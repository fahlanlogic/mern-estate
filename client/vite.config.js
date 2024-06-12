import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://mern-estate-silk.vercel.app",
        // secure: false,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ""),
      },
    },
  },

  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
