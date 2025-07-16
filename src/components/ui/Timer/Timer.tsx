import { ReactComponent as TimerIcon } from '@/assets/icons/timerIcon.svg';
import type { TimerProps } from './Timer.types';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/*
 * 컴포넌트 구성 - [아이콘] [프로그레스바] [남은 시간]
 */

const Timer = ({ showSeconds = true, duration = 15, onComplete }: TimerProps) => {
  const [isActive, setIsActive] = useState(true);
  const [remainingTime, setRemainingTime] = useState(15);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsActive(false);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className='relative w-full max-w-[320px] h-[48px]'>
      {/* 아이콘 */}
      <div className='absolute left-0 top-[35%] -translate-y-1/2 w-[48px] h-[48px] flex items-center justify-center z-10'>
        <TimerIcon />
      </div>

      {/* 프로그레스바 + 텍스트 */}
      <div className='h-[40px] pl-[32px] pr-[10px] flex items-center gap-[8px]'>
        {/* 프로그레스 바 */}
        <div className='flex h-[16px] w-[252px] bg-tangerine-weak rounded-r-full overflow-hidden relative z-0'>
          {isActive && (
            <motion.div
              role='progressbar'
              initial={{ width: '252px' }}
              animate={{ width: 0 }}
              transition={{ duration, ease: 'linear' }}
              className='h-full bg-tangerine-strong rounded-r-full'
              onAnimationComplete={() => setIsActive(false)}
            />
          )}
        </div>

        {/* 텍스트 (초) */}
        {showSeconds && (
          <span className='w-[25px] text-[20px] font-extrabold leading-[23px] text-tangerine-strong text-center'>
            {remainingTime}
          </span>
        )}
      </div>
    </div>
  );
};

export default Timer;
