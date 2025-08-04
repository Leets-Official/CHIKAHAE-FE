import LottieTest from '@/components/LottieTest';
import Timer from '@/components/ui/Timer/Timer';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import BrushingTip from '@/features/brushing/BrushingTip';
import { useState, useEffect } from 'react';
import BackgroundImage from '@/assets/images/animation_background.svg';
import PlayPauseButton from '@/components/ui/Button/AnimationButton';

const COUNTDOWN_TEXT = ['3', '2', '1', '시작'];

const BrushingPage = () => {
  const [countdownIndex, setCountdownIndex] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isCountingDown) return;

    if (countdownIndex < COUNTDOWN_TEXT.length - 1) {
      const timeout = setTimeout(() => {
        setCountdownIndex((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      // 마지막 "시작"을 1초간 보여준 후 타이머 시작
      const timeout = setTimeout(() => {
        setIsCountingDown(false);
        setIsPlaying(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [countdownIndex, isCountingDown]);

  return (
    <div className='flex flex-col w-full max-w-[430px] min-w-[360px] min-h-screen mx-auto relative'>
      <GlobalTopNav type='global' showCancel={false} message='양치하기' />

      {/* 콘텐츠 영역 */}
      <div className='flex flex-col items-center justify-start relative mt-[76px] z-10'>
        <div className='pl-[18px] pr-[5px] flex flex-col w-full max-w-[430px] min-w-[360px]'>
          <Timer duration={180} size='wide' mode='animation' isActive={isPlaying} />
        </div>
        <div className='h-[36.5px]' />

        {/* 애니메이션 영역 */}
        <div className='relative w-full max-w-[480px] min-w-[360px] h-[360px] mx-auto'>
          {/* Top Cover */}
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-[3px] bg-[#72B6F9] z-20' />

          {/* Background Image */}
          <img
            src={BackgroundImage}
            alt='배경 이미지'
            style={{ objectPosition: 'center 25%' }}
            className='absolute inset-0 w-full h-full object-cover z-0'
          />

          {/* 덮는 반투명 컴포넌트 */}
          <div className='absolute inset-0 bg-bg-primary-lightblue opacity-[0.85] z-10' />

          {isCountingDown && (
            <div className='absolute inset-0 flex items-center justify-center z-30'>
              <div className='font-cookie text-fg-accent-blue-weak text-[64px] text-center tracking-[-0.64px]'>
                {COUNTDOWN_TEXT[countdownIndex]}
              </div>
            </div>
          )}

          {/* Lottie + 버튼
          <div className='absolute inset-0 flex flex-col items-center justify-center z-30'>
            <LottieTest />
            <PlayPauseButton isPlaying={isPlaying} onToggle={() => setIsPlaying((prev) => !prev)} />
          </div> */}

          <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[3px] bg-[#72B6F9] z-20' />
        </div>
      </div>

      {/* TIP */}
      <BrushingTip isPlaying={isPlaying} />
    </div>
  );
};

export default BrushingPage;
