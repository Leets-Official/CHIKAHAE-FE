import { useEffect } from 'react';

//토스트 유형(메세지, 유형 별 분류위한 속성, 노출 시간, onClose)
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

const typeStyles = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
};

const Toast = ({ message, type = 'info', duration = 3000, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    //등록한 타이머 취소하는 기능 -> useEffect에서 의존성 변경 될 때 타이머 유지되는 에러 방지
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // 타입별 css 디자인

  return (
    <div
      className={`fixed top-5 right-5 z-[9999] text-white px-4 py-2 rounded shadow-md transition-opacity ${typeStyles[type]}`}
    >
      {message}
    </div>
  );
};

export default Toast;
