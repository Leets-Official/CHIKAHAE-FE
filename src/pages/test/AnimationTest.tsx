import LottieTest from '@/components/LottieTest';
import Timer from '@/components/ui/Timer/Timer';
import { ReactComponent as AnimationBackground } from '@/assets/images/animationBackground.svg';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import { TIPS } from '@/constants/tips';
import { useState, useEffect } from 'react';

const Page = () => {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => {
        let next;
        do {
          next = Math.floor(Math.random() * TIPS.length);
        } while (next === prev);
        return next;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <GlobalTopNav type='global' showCancel={false} message='양치' />
      <div className='flex flex-col items-center justify-center min-h-screen gap-15 relative z-0 px-4'>
        <Timer duration={180} />
        <div className='relative flex justify-center items-center max-w-[480px] min-w-[360px] w-full'>
          <AnimationBackground className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full not-visited:lz-0' />
          <div className='relative z-10 flex justify-center items-center pt-10'>
            <LottieTest />
          </div>
        </div>

        <p className='text-center text-[16px] leading-[22px] tracking-[-0.16px] font-extrabold'>
          {TIPS[tipIndex]}
        </p>
      </div>
    </>
  );
};

export default Page;
