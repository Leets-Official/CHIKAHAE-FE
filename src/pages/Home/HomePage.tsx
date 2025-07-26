import HomeTopNav from '@/components/ui/Nav/HomeTopNav';
import BottomNav from '@/components/ui/Nav/BottomNav';
import HomeBanner from '@/features/Home/components/HomeBanner';
import { ReactComponent as Caution } from '@/assets/icons/caution.svg';
import BrushingSessionList from '@/features/Home/components/BrushingSessionList';
import { brushingCards } from '@/features/Home/constants/brushingSessions';
import { useState } from 'react';

const HomePage = () => {
  const [doneList, setDoneList] = useState(Array(brushingCards.length).fill(false));

  const handleDone = (idx: number) => {
    setDoneList(list => list.map((v, i) => (i === idx ? true : v)));
  };

  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    month: 'long', // 7월
    day: 'numeric', // 25
    weekday: 'long', // 금요일
  });

  return (
    <div className='w-[360px] min-h-screen flex flex-col items-center mx-auto'>
      {/* 1. 상단 헤더: 상단 바 */}
      <HomeTopNav />
      <div className='h-[44px]' />

      {/* 2. 홈 배너 이미지 */}
      <div className="left-0 top-[42px]">
        <HomeBanner />
      </div>
      <div className="w-full flex flex-col gap-[18px] pt-[20px] pl-[18px]">
        {/* 날짜+미션 */}
        <div className="w-full gap-[12px]">
          <span className="w-[121px] h-[16px] body-14-b">{dateString}</span>
          <div className="flex flex-row items-center gap-[8px]">
            <div className="w-[97px] h-[23px] flex items-center head-20-eb">오늘의 미션</div>
            <Caution className="w-[16px] h-[17px]" />
          </div>
        </div>

        {/* 양치 카드 슬라이드 */}
        <BrushingSessionList cards={brushingCards} doneList={doneList} handleDone={handleDone} />
      </div>
      {/* 7. 하단 네비게이션: 아이템 리스트 */}
        <BottomNav />
    </div>
  );
};

export default HomePage;
