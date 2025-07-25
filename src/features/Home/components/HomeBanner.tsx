import { ReactComponent as Background } from '@/assets/images/background.svg';
import { ReactComponent as Rabbit } from '@/assets/icons/rabbit.svg';
import { ReactComponent as Toothbrush } from '@/assets/icons/toothbrush.svg';
import { ReactComponent as Coin } from '@/assets/icons/coin.svg';

const HomeBanner = () => {
  return (
    <div className="relative w-[360px] h-[340px]">
      <Background className="absolute inset-0 w-full h-full object-cover z-0" />
      <Rabbit className="absolute w-[71.12px] h-[120px] top-[208.51px] left-[145.44px] z-10" />
      <Toothbrush className="absolute top-[165.33px] left-[85.43px] z-10" />
      <div className="absolute w-[86.18px] h-[36px] top-[20.67px] left-[253.49px] z-10 flex items-center justify-center">
        <div className="absolute w-[84px] h-[32px] top-[2.1px] left-[2.18px] bg-bg-primary-clearblue rounded-full flex flex-row items-center justify-between px-2">
          <Coin className="w-[30px] h-[30px] flex-shrink-0" />
          <span className="absolute w-[27px] h-[16px] text-fg-secondary-strong body-14-eb left-[43px] flex items-center justify-center ml-auto">
            100
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
