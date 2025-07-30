import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import AlarmContent from '@/features/Mypage/alarm/alarmSet/AlarmContent';

const AlarmPage = () => {
  return (
    <>
      <div className='w-full min-h-screen flex flex-col mx-auto py-[12px]'>
        <GlobalTopNav message='양치 알림' showCancel={false} />
        <div className='h-[24px]' />
        <p className='px-[20px]'>
          <AlarmContent />
        </p>
      </div>
    </>
  );
};

export default AlarmPage;
