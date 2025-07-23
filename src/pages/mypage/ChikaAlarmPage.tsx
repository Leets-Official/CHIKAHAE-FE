import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import ChikaAlarm from '@/features/Mypage/components/ChikaAlarm';

const ChikaAlarmPage = () => {
  return (
    <>
      <div className='w-[360px] max-w-[430px] h-[745px] flex flex-col gap-6 bg-white mx-auto opacity-100'>
        <div className='w-[360px] h-[44px] gap-[10px] opacity-100 rotate-0 pt-[10px] pr-[20px] pb-[10px] pl-[20px]'>
          <GlobalTopNav message='양치 알림' showCancel={false} />
        </div>
        <div className='w-[320px] h-[188px] opacity-100 rounded-[8px] mx-auto'>
          <ChikaAlarm />
        </div>
      </div>
    </>
  );
};

export default ChikaAlarmPage;
