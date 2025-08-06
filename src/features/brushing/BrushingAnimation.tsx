import Lottie from 'lottie-react';
import { useEffect, useRef } from 'react';
import AnimationButton from '@/components/ui/Button/AnimationButton';
import BackgroundImage from '@/assets/images/animation_background.svg';
import { COUNTDOWN_TEXT } from '@/constants/counterdownText';

// 배경 + 애니메이션 + 정지/재생 버튼

export interface BrushingAnimationProps {
  animationData: any;
  animationIndex: number;
  isBrushingAnimation: (index: number) => boolean;
  isPlaying: boolean;
  isCountingDown: boolean;
  countdownIndex: number;
  onTogglePlay: () => void;
}

const BrushingAnimation = ({
  animationData,
  animationIndex,
  isBrushingAnimation,
  isPlaying,
  isCountingDown,
  countdownIndex,
  onTogglePlay,
}: BrushingAnimationProps) => {
  const lottieRef = useRef<any>(null);

  //  isPlaying이 변경될 때 Lottie 애니메이션 재생/정지
  useEffect(() => {
    const lottie = lottieRef.current;
    if (!lottie) return;

    if (isPlaying) {
      lottie.play();
    } else {
      lottie.pause();
    }
  }, [animationData, animationIndex, isPlaying]);

  return (
    <div className='relative w-full max-w-[480px] min-w-[360px] h-[360px] mx-auto'>
      {/* 상단 파란 바 */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-[3px] bg-[#72B6F9] z-20' />

      {/* 배경 이미지 */}
      <img
        src={BackgroundImage}
        alt='배경 이미지'
        style={{ objectPosition: 'center 25%' }}
        className='absolute inset-0 w-full h-full object-cover z-0'
      />

      {/* Lottie 애니메이션 */}
      <div className='absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden'>
        <Lottie
          key={animationIndex}
          lottieRef={lottieRef} // ref 연결
          animationData={animationData}
          loop
          autoplay={false} // 수동 재생
          className={`w-full h-full ${
            isBrushingAnimation(animationIndex) ? '-translate-y-[-27%]' : ''
          }`}
        />
      </div>

      {/* 카운트다운 오버레이 */}
      {isCountingDown && (
        <>
          {/* 반투명 배경 */}
          <div className='absolute inset-0 bg-bg-primary-lightblue opacity-[0.85] z-10' />
          <div className='absolute inset-0 flex items-center justify-center z-30'>
            {/* 카운트다운 숫자 */}
            <div className='text-fg-accent-blue-weak text-[84px] text-center tracking-[-0.64px] font-cookie font-[900]'>
              {COUNTDOWN_TEXT[countdownIndex]}
            </div>
          </div>
        </>
      )}

      {/* 하단 파란 바 */}
      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[3px] bg-[#72B6F9] z-20' />

      {/* 재생/일시정지 버튼 */}
      <div className='justify-center pt-[384px] flex mx-auto'>
        <AnimationButton isPlaying={isPlaying} onToggle={onTogglePlay} />
      </div>
    </div>
  );
};

export default BrushingAnimation;
