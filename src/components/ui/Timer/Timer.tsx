import { ReactComponent as TimerIcon } from '@/assets/icons/timerIcon.svg';
import type { TimerProps } from './Timer.types';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// 컴포넌트 구성 - [아이콘] [프로그레스바] [남은 시간]

const Timer = ({
  showSeconds = true,
  duration = 15,
  onComplete,
  size = 'default',
  mode = 'quiz',
  isActive = true,
}: TimerProps) => {
  const [remainingTime, setRemainingTime] = useState(duration);

  // default(기존 퀴즈 타이머 사이즈) | wide(애니메이션 전용 넓은 타이머), 기본값은 default
  const timerWidthClasses =
    size === 'wide' ? 'max-w-[480px] min-w-[360px]' : 'max-w-[360px] min-w-[320px]';

  //  duration 변경되면 remainingTime 초기화
  useEffect(() => {
    setRemainingTime(duration);
  }, [duration]);

  // onComplete 중복 호출 방지용 ref
  const hasCompleted = useRef(false);

  // duration 변경되면 타이머 초기화
  useEffect(() => {
    setRemainingTime(duration);
    hasCompleted.current = false; // 완료 플래그 초기화
  }, [duration]);

  //  타이머 감소 로직
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!hasCompleted.current) {
            hasCompleted.current = true;
            onComplete?.();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, onComplete]);

  const formatTime = (seconds: number) => {
    if (mode === 'animation') {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}분 ${secs}초`;
    }
    return seconds.toString();
  };
  return (
    <div className={`relative w-full ${timerWidthClasses} h-[48px]`}>
      {/* 아이콘 */}
      <div className='absolute left-0 top-[35%] -translate-y-1/2 w-[48px] h-[48px] flex items-center justify-center z-10'>
        <TimerIcon />
      </div>

      {/* 프로그레스바 + 텍스트 */}
      <div className='h-[40px] pl-[32px] pr-[10px] flex items-center gap-[8px] w-full'>
        {/* 프로그레스 바 */}

        <div className='flex h-[16px] flex-grow bg-tangerine-weak rounded-r-full overflow-hidden relative z-0'>
          {isActive && (
            <motion.div
              role='progressbar'
              initial={{ width: '100%' }}
              animate={{ width: `${(remainingTime / duration) * 100}%` }}
              transition={{ duration, ease: 'linear' }}
              className='h-full bg-tangerine-strong rounded-r-full'
            />
          )}
        </div>

        {/* 텍스트 (초 or 분:초) */}
        {showSeconds && (
          <span className='auto-width text-[20px] font-extrabold leading-[23px] text-tangerine-strong text-center'>
            {formatTime(remainingTime)}
          </span>
        )}
      </div>
    </div>
  );
};

export default Timer;
