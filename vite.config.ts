import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 🔹 런타임에서 @ 인식하도록 설정
    },
  },
  server: {
    port: 3000,
  },
});
