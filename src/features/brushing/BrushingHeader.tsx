import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import Timer from '@/components/ui/Timer/Timer';

// 탑 네비 + 타이머

interface BrushingHeaderProps {
  isPlaying: boolean;
  onTimeout: () => void;
  onClickLeft: () => void;
}

const BrushingHeader = ({ isPlaying, onTimeout, onClickLeft }: BrushingHeaderProps) => {
  return (
    <>
      <GlobalTopNav type='global' showCancel={false} message='양치하기' onClickLeft={onClickLeft} />
      <div className='pl-[18px] pr-[5px] flex flex-col w-full max-w-[430px] min-w-[360px] mt-[76px]'>
        <Timer
          duration={180}
          size='wide'
          mode='animation'
          isActive={isPlaying}
          onTimeout={onTimeout}
        />
      </div>
    </>
  );
};

export default BrushingHeader;
