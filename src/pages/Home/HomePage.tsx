import HomeTopNav from '@/components/ui/Nav/HomeTopNav';
import BottomNav from '@/components/ui/Nav/BottomNav';
import HomeBanner from '@/features/Home/homeBanner/HomeBanner';
import { ReactComponent as Caution } from '@/assets/icons/caution.svg';
import BrushingSessionList from '@/features/Home/todayMission/BrushingSessionList';
import { useTodayMissions } from '@/hooks/queries/useGetTodayMissions';

const HomePage = () => {
  const { data: cards = [] } = useTodayMissions();

  /**
   * ==== 미션 완료 후 (ex. 퀴즈 끝나고, 양치 끝나고) 아래 코드 호출 필요 ====
   * queryClient.invalidateQueries(['todayMissions']);
   */

  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <div className='max-w-[430px] min-w-[360px] w-full min-h-screen flex flex-col items-center mx-auto'>
      {/* 홈 헤더 */}
      <HomeTopNav />
      <div className='h-14' />

      {/* 홈 배너 이미지 */}
      <div className='left-0 h-14'>
        <HomeBanner />
      </div>
      <div className='h-[280px]' />

      {/* 날짜+미션 */}
      <div className='w-full pl-[18px] pt-[20px] pb-[25px] flex flex-col mx-auto'>
        <div className='w-full gap-[12px]'>
          <span className='w-[121px] h-[16px] body-14-b'>{dateString}</span>
          <div className='flex flex-row items-center gap-[8px]'>
            <div className='w-[97px] h-[23px] flex items-center head-20-eb'>오늘의 미션</div>
            <Caution className='w-[16px] h-[17px]' />
          </div>
        </div>

        {/* 양치 카드 슬라이드 */}
        <BrushingSessionList cards={cards} />
      </div>

      {/* 하단 네비게이션: 아이템 리스트 */}
      <BottomNav />
      <div className='h-14' />
    </div>
  );
};

export default HomePage;
