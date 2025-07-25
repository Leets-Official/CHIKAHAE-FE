import LottieTest from '@/components/LottieTest';
import Timer from '@/components/ui/Timer/Timer';

const Page = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-15 max-w-[480px] min-w-[360px]'>
      <h1>치카해 애니메이션 테스트중입니다</h1>
      <Timer />
      <LottieTest />
    </div>
  );
};

export default Page;
