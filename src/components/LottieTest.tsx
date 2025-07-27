import Lottie from 'lottie-react';
import animationData from '@/assets/lottie/Comp 1.json';

const LottieTest = () => {
  return (
    <div className='w-64 h-64'>
      <Lottie
        animationData={animationData}
        loop // 반복 재생 여부npm
        autoplay //자동 재생 여부
      />
    </div>
  );
};

export default LottieTest;
