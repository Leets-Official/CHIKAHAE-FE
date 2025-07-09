import { useEffect, useState } from 'react';

//토스트 유형(메세지, 유형 별 분류위한 속성, 노출 시간, onClose)
interface ToastProps {
  id: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
  actionText?: string;
  onActionClick?: () => void;
}

const Toast = ({
  id,
  message,
  duration = 3000,
  onClose,
  actionText,
  onActionClick,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true); // 토스트 가시성

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    // duration이 null이 아닐 때만 타이머 설정
    if (duration) {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
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
      className={`
            flex
            w-[320px]
            h-[48px]
            items-center
            justify-between
            px-4
            rounded-lg
            bg-black/70
            text-white
            ${isVisible ? 'animate-fade-in' : 'animate-fade-out'} 
            `} // 상태에 따른 애니메이션 변화
    >
      <span
        className='
        text-[#CED6DD]
        font-extrabold
        text-[14px]
        leading-[20px]
        tracking-[-0.14px]
        font-[NanumSquareRound]
        w-[246px]
        overflow-hidden
        text-ellipsis
        whitespace-nowrap
        flex-shrink-0
        '
      >
        {message}
      </span>

      {actionText && (
        <button
          onClick={handleActionClick}
          className='
          self-stretch
          text-[#CED6DD]
           font-extrabold
          text-[14px]
          leading-[20px]
          tracking-[-0.14px]
          font-[NanumSquareRound]
          hover:opacity-80
          px-2
          py-1'
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
export default Toast;
