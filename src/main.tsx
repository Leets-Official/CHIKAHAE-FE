import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastProvider } from './contexts/ToastContext';
import '@/styles/global.css';
import App from './App';

const queryClient = new QueryClient();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('SW 등록 성공:', registration);
      })
      .catch((err) => {
        console.error('SW 등록 실패:', err);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ToastProvider>
      <App />
    </ToastProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
);
