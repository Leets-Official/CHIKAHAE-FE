import { ReactComponent as Coin } from '@/assets/icons/coin.svg';

const CoinCount = () => {
  return (
    <div className='relative w-[84px] h-[32px] bg-bg-primary-clearblue rounded-full flex flex-row items-center justify-between px-2'>
      <Coin className='absolute left-[16px] z-10 w-[36px] h-[36px] -translate-x-1/2' />
      <span className=' text-fg-secondary-strong body-14-eb flex items-center pl-[34px] pt-[2px]'>
        222
      </span>
    </div>
  );
};

export default CoinCount;
