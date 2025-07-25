import LottieTest from '@/components/LottieTest';
import Timer from '@/components/ui/Timer/Timer';
import { ReactComponent as AnimationBackground } from '@/assets/images/animationBackground.svg';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';

const Page = () => {
  return (
    <>
      <GlobalTopNav type='global' showCancel={false} message='양치' />
      <div className='flex flex-col items-center justify-center min-h-screen gap-15 relative z-0 px-4'>
        {/* 1. 타이머 */}
        <Timer/>

        {/* 2. 배경 + 애니메이션 묶음 */}
        <div className='relative flex justify-center items-center max-w-[480px] min-w-[360px] w-full'>
          {/* background는 absolute지만 부모 relative 기준 */}
          <AnimationBackground className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full not-visited:lz-0' />
          <div className='relative z-10 flex justify-center items-center pt-10'>
            <LottieTest />
          </div>
        </div>

        {/* 3. TIP 문구 */}
        <p className='text-center text-base font-semibold'>tip: 양치 매일 하기</p>
      </div>
    </>
  );
};

export default Page;
