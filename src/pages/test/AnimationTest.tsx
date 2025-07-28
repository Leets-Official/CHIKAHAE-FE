import LottieTest from '@/components/LottieTest';
import Timer from '@/components/ui/Timer/Timer';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import { TIPS } from '@/constants/tips';
import { useState, useEffect } from 'react';
import { ReactComponent as BackgroundImage } from '@/assets/images/backgroundImage.svg';

const AnimationTest = () => {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // 10초마다 함수 반복 실행
      setTipIndex((prev) => {
        let next;
        do {
          next = Math.floor(Math.random() * TIPS.length);
        } while (next === prev); //중복 방지
        return next;
      });
    }, 10000);

    return () => clearInterval(interval); // 메모리 누수 방지용
  }, []);
  return (
    <>
      <GlobalTopNav type='global' showCancel={false} message='양치' />
      <div className='flex flex-col items-center justify-center min-h-screen gap-10 relative z-0 px-4'>
        <Timer duration={180} size='wide' />
        <div className='relative flex justify-center items-center max-w-[480px] min-w-[360px] w-full min-h-[450px]'>
          <BackgroundImage className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full not-visited:lz-0' />
          <div className='relative z-10 flex justify-center items-center pt-10'>
            <LottieTest />
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
