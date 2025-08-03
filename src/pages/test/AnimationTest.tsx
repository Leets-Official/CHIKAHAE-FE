import LottieTest from '@/components/LottieTest';
import Timer from '@/components/ui/Timer/Timer';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import { TIPS } from '@/constants/tips';
import { useState, useEffect } from 'react';
import { ReactComponent as BackgroundImage } from '@/assets/images/backgroundImage.svg';
import PlayPauseButton from '@/components/ui/Button/AnimationButton';

const AnimationTest = () => {
  const [tipIndex, setTipIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [tipRemainingTime, setTipRemainingTime] = useState(10);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTipRemainingTime((prev) => {
        if (prev <= 1) {
          // 0초 도달 → 팁 변경 후 다시 10초 세팅
          setTipIndex((prevTip) => {
            let next;
            do {
              next = Math.floor(Math.random() * TIPS.length);
            } while (next === prevTip); // 중복 방지
            return next;
          });
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <>
      <GlobalTopNav type='global' showCancel={false} message='양치하기' />
      <div className='flex flex-col items-center justify-center min-h-screen gap-10 relative z-0 px-4'>
        <Timer duration={180} size='default' mode='animation' isActive={isPlaying} />
        <div className='relative flex justify-center items-center max-w-[480px] min-w-[360px] w-full min-h-[450px]'>
          <BackgroundImage className='absolute top-0 left-1/2 -translate-x-1/2 w-[360px] h-full not-visited:lz-0' />
          <div className='relative z-10 flex flex-col justify-center items-center'>
            <LottieTest />
            <PlayPauseButton isPlaying={isPlaying} onToggle={() => setIsPlaying((prev) => !prev)} />
          </div>
        </div>

        <p className='text-center text-[16px] leading-[22px] tracking-[-0.16px] font-extrabold z-9999'>
          {TIPS[tipIndex]}
        </p>
      </div>
    </>
  );
};

export default AnimationTest;
