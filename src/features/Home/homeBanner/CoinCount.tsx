import { ReactComponent as Coin } from '@/assets/icons/coin.svg';
import { usePointBalance } from '@/hooks/queries/useGetPointBalance';

const CoinCount = () => {
  const { data: balance } = usePointBalance();

  /**
   * ==== 포인트 변경 시 아래 코드 호출 필요 ====
   * queryClient.invalidateQueries(['pointBalance']);
   */

  return (
    <div className='relative w-[84px] h-[32px] bg-bg-primary-clearblue rounded-full flex flex-row items-center justify-between px-2'>
      <Coin className='absolute left-[16px] z-10 w-[36px] h-[36px] -translate-x-1/2' />
      <span className=' text-fg-secondary-strong body-14-eb flex items-center pl-[34px] pt-[2px]'>
        {balance !== null ? balance : '...'}
      </span>
    </div>
  );
};

export default CoinCount;
