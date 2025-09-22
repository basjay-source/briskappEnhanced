import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: ['accountancy-practice-app-tunnel-5351fqka.devinapps.com', 'localhost', '127.0.0.1'],
    hmr: {
      clientPort: 5173,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('https://app-xrzbrdsj.fly.dev'),
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})

