import { createContext, useContext, useCallback, useState } from 'react';
import type { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid'; // 토스트 ID 생성 함수
import Toast from '@/components/ui/Toast/Toast';

/**
 * ==== 토스트 사용법  ====
 *
 * 1. 컴포넌트 내에서 useToast 훅 호출:
 *    const { showToast } = useToast();
 *
 * 2. 토스트 띄우기:
 *    showToast({
 *      message: '안내 메시지',
 *      duration: 3000,           // 표시 시간(ms)
 *      actionText: '취소',       // 버튼 텍스트 (선택사항)
 *      onActionClick: () => {},  // 버튼 클릭 핸들러 (선택사항)
 *    });
 */

interface ToastData {
  id: string;
  message: string;
  duration?: number;
  actionText?: string;
  onActionClick?: () => void;
  showIcon?: boolean;
}

interface ToastContextType {
  showToast: (toast: Omit<ToastData, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// ToastProvider: App.tsx를 감싸 전역 토스트 상태 제공
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  // showToast: 토스트 추가
  const showToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = uuidv4(); // 고유 ID 생성
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  // handleClose: 토스트 닫기
  const handleClose = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id)); // 해당 ID 제거
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* 화면 상단 중앙에 토스트 렌더링 */}
      <div className='fixed top-[60px] left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2'>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            duration={toast.duration}
            actionText={toast.actionText}
            onActionClick={toast.onActionClick}
            showIcon={toast.showIcon}
            onClose={handleClose}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// useToast 훅: 토스트 함수 사용 시 필수로 호출
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
