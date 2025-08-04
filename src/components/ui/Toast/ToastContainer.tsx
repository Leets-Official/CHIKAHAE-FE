import Toast from './Toast';

interface ToastItem {
  id: string;
  message: string;
  duration?: number;
  actionText?: string;
  showIcon?: boolean;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  removeToast: (id: string) => void;
}

const ToastContainer = ({ toasts, removeToast }: ToastContainerProps) => {
  return (
    // flex-col + gap-2 : 토스트 여러 개가 쌓이도록
    <div className='fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2'>
      {toasts.map(({ id, message, duration, actionText, showIcon }) => (
        <Toast
          key={id}
          id={id}
          message={message}
          duration={duration}
          actionText={actionText}
          showIcon={showIcon}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
