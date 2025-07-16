import { useEffect, useState } from 'react';
import { ReactComponent as Coin } from '@/assets/icons/coin.svg';
import clsx from 'clsx';

//토스트 유형(메세지, 유형 별 분류 위한 속성, 노출 시간, onClose)
interface ToastProps {
  id: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
  actionText?: string;
  onActionClick?: () => void;
  showIcon?: boolean;
}

const Toast = ({
  id,
  message,
  duration = 3000,
  onClose,
  actionText,
  onActionClick,
  showIcon = true,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [id, duration]);

  useEffect(() => {
    if (!isVisible) {
      const animationEndTimer = setTimeout(() => {
        onClose(id);
      }, 300);
      return () => clearTimeout(animationEndTimer);
    }
  }, [isVisible, id, onClose]);

  const handleActionClick = () => {
    if (onActionClick) {
      onActionClick();
    }
    setIsVisible(false);
  };

  return (
    <div
      className={clsx(
        'inline-flex',
        'px-[18px]',
        'py-[14px]',
        'justify-center',
        'items-center',
        'gap-[10px]',
        'rounded-[30px]',
        'bg-bg-primary-white',
        'shadow-[0px_0px_10px_0px_rgba(34,34,34,0.10)]',
        isVisible ? 'animate-fade-in' : 'animate-fade-out',
      )}
    >
      {/* 조건부 아이콘 렌더링 */}
      {showIcon && <Coin className='w-[20px] h-[20px]' />}

      <span className={clsx('body-12-eb', 'leading-[14px]', 'text-fg-accent-toast')}>
        {message}
      </span>

      {actionText && (
        <button
          onClick={handleActionClick}
          className={clsx('body-12-eb', 'text-fg-accent-toast', 'px-2', 'py-1', 'hover:opacity-80')}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
export default Toast;
