import { ReactComponent as Background } from '@/assets/images/background.svg';
import { ReactComponent as Rabbit } from '@/assets/icons/rabbit.svg';
import { ReactComponent as Toothbrush } from '@/assets/icons/toothbrush.svg';
import CoinCount from './CoinCount';

const HomeBanner = () => {
  return (
    <div className='relative w-[360px] h-[340px]'>
      <Background className='absolute inset-0 w-full max-w-[480px] min-w-[360px] h-full object-cover z-0' />
      <Rabbit className='absolute w-[71.12px] h-[120px] top-[208.51px] left-[145.44px] z-10' />
      <Toothbrush className='absolute top-[165.33px] left-[85.43px] z-10' />
      <div className='absolute top-[20.33px] right-[20px] z-10 flex items-center justify-center'>
        <CoinCount />
      </div>
    </div>
  );
};

export default HomeBanner;
