
import HomeTopNav from '@/components/ui/Nav/HomeTopNav';
import BottomNav from '@/components/ui/Nav/BottomNav';
import HomeBanner from '@/features/Home/components/HomeBanner';
import { ReactComponent as Caution } from '@/assets/icons/caution.svg';
import BrushingSessionCard from '@/features/Home/components/BrushingSessionCard';
import { brushingCards } from '@/features/Home/constants/brushingSessions';
import { useState } from 'react';

const HomePage = () => {
  const [doneList, setDoneList] = useState(Array(brushingCards.length).fill(false));

  const handleDone = (idx: number) => {
    setDoneList(list => list.map((v, i) => (i === idx ? true : v)));
  };

  return (
    <div className="w-[360px] max-w-[430px] h-[745px] flex flex-col gap-6 bg-bg-primary-white mx-auto">
     <div className="relative w-[360px] h-[738px] top-[42px]">
      {/* 1. 상단 헤더: 상단 바 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[360px] h-[44px] z-50">
        <HomeTopNav />
      </div>

        {/* 2. 홈 배너 이미지 */}
        <div className="absolute left-0 top-[42px] ">
          <HomeBanner />
        </div>
      <div className="absolute left-0 top-[382px] w-[360px] h-[284px] flex flex-col gap-[18px] pt-[20px] pl-[18px]">
        {/* 날짜+미션 */}
        <div className="w-[121px] h-[51px] gap-[12px]">
          <span className="w-[121px] h-[16px] body-14-b">7월 11일 금요일</span>
          <div className="flex flex-row items-center gap-[8px]">
            <div className="w-[97px] h-[23px] flex items-center head-20-eb">오늘의 미션</div>
            <Caution className="w-[16px] h-[16px]" />
          </div>
        </div>

        {/* 양치 카드 슬라이드 */}
        <div className="relative w-full scroll-smooth overflow-x-auto snap-x snap-mandatory flex gap-[15px] pr-[18px] no-scrollbar">
          {brushingCards.map((card, idx) => (
            <BrushingSessionCard
              key={card.id}
              title={card.title}
              description={card.description}
              done={doneList[idx]}
              onClick={() => handleDone(idx)}
              buttonClassName="text-white"
            />
          ))}
        </div>
      </div>
      </div>
      {/* 7. 하단 네비게이션: 아이템 리스트 */}
      <div className="relative w-[360px] h-[70px] left-1/2 -translate-x-1/2">
        <BottomNav />
      </div>
    </div>
  );
};

export default HomePage;
