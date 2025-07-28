import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import ChikaAlarm from '@/features/Mypage/components/ChikaAlarm';

const ChikaAlarmPage = () => {
  return (
    <>
      <div className='w-full min-h-screen flex flex-col gap-6 mx-auto'>
        <GlobalTopNav message='양치 알림' showCancel={false} type="global" />
        <div className='h-[24px]' />
        <div className='w-full h-[188px] rounded-[8px] px-[20px] py-[10px] mx-auto'>
          <ChikaAlarm />
        </div>
      </div>
    </>
  );
};

export default ChikaAlarmPage;
