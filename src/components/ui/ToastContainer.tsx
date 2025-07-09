import Toast from './Toast';

interface ToastItem {
  id: string;
  message: string;
  duration?: number;
  actionText?: string;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  removeToast: (id: string) => void;
}

const ToastContainer = ({ toasts, removeToast }: ToastContainerProps) => {
  return (
    // flex-col + gap-2 : 토스트 여러 개가 쌓이도록
    <div className='fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2'>
      {toasts.map(
        (
          toast, // toasts 배열 돌면서 하나씩 렌더링
        ) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            duration={toast.duration}
            actionText={toast.actionText}
            onClose={removeToast}
          />
        ),
      )}
    </div>
  );
};

export default ToastContainer;
