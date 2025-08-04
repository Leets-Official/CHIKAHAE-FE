import Background from '@/assets/images/home_background.svg';
import { ReactComponent as Rabbit } from '@/assets/icons/rabbit.svg';
import { ReactComponent as Toothbrush } from '@/assets/icons/toothbrush.svg';
import CoinCount from './CoinCount';

const HomeBanner = () => {
  return (
    <div className='relative max-w-[480px] min-w-[360px] w-full h-[340px] mx-auto'>
      <img
        src={Background}
        alt='홈 배경'
        className='absolute inset-0 w-full h-full object-cover object-bottom z-0'
      />
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[-35px] z-10'>
        <Toothbrush className='absolute top-[-80px] left-[-60px]' />
        <Rabbit className='relative w-[71.12px] h-[120px]' />
      </div>
      <div className='absolute top-[20.33px] right-[20px] z-10 flex items-center justify-center'>
        <CoinCount />
      </div>
    </div>
  );
};

export default HomeBanner;
