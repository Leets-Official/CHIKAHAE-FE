import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    svgr({
      exportAsDefault: false,
    } as unknown as Parameters<typeof svgr>[0]), // 타입 충돌 완전 방지
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', // 서비스 워커가 자동으로 갱신됨
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
        type: 'module',
      },
      manifest: {
        name: 'CHIKAHAE',
        short_name: 'CHIKAHAE', // 홈 화면 등에 표시될 줄임 이름
        start_url: '/', // 웹이 시작될 URL
        display: 'standalone', // 주소창 제거
        background_color: '#fafbfc',
        theme_color: '#5fc6f0',
        icons: [
          {
            src: '/profileImage.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    }),
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
