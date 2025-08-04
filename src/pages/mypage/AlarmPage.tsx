import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import AlarmContent from '@/features/Mypage/alarm/alarmSet/AlarmContent';

const AlarmPage = () => {
  return (
    <>
      <div className='w-full max-w-[480px] min-w-[360px] min-h-screen flex flex-col mx-auto py-[12px]'>
        <GlobalTopNav message='양치 알림' showCancel={false} />
        <div className='h-[24px]' />
        <div className='px-[20px]'>
          <AlarmContent />
        </div>
      </div>
    </>
  );
};

export default AlarmPage;
