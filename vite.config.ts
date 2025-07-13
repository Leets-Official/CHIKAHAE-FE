import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

interface SVGRPluginOptions {
  exportAsDefault?: boolean;
}

export default defineConfig({
  plugins: [
    svgr({
      exportAsDefault: false,
    } as unknown as Parameters<typeof svgr>[0]), // 타입 충돌 완전 방지
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
});
