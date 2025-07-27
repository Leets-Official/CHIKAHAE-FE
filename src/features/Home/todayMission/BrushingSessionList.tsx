import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BrushingSessionCard from './BrushingSessionCard';
import type { BrushingCardConfig } from '@/types/brushing';

interface BrushingSessionListProps {
  cards: BrushingCardConfig[];
}

const BrushingSessionList: React.FC<BrushingSessionListProps> = ({ cards }) => {
  const navigate = useNavigate();

  // 스크롤 관련 ref 및 상태
  const sliderRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const scrollLeftRef = useRef(0);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // 마우스 드래그 시작
  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    scrollLeftRef.current = sliderRef.current.scrollLeft;
  }, []);

  // 마우스 움직일 때 (슬라이드 스크롤 이동)
  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !sliderRef.current) return;
      e.preventDefault();

      // 이전 frame 취소 후 새 frame 등록
      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      frameRef.current = requestAnimationFrame(() => {
        const x = e.pageX - sliderRef.current!.offsetLeft;
        const walk = (x - startX) * 1;
        sliderRef.current!.scrollLeft = scrollLeftRef.current - walk;
      });
    },
    [isDragging, startX],
  );

  // 드래그 종료
  const stopDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 컴포넌트 언마운트 시 애니메이션 프레임 정리
  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // 완료된 미션 카드는 뒤로 정렬
  const sortedCards = [...cards].sort((a, b) => {
    return Number(a.isCompleted) - Number(b.isCompleted);
  });

  return (
    <div
      ref={sliderRef}
      className={`pb-[8px] w-full snap-x scroll-smooth overflow-x-hidden overflow-y-hidden flex no-scrollbar select-none mt-[18px] 
        ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
      `}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      {/* 카드 리스트 */}
      <div className='flex gap-[15px] pl-[2px] pr-[2px]'>
        {sortedCards.map((card) => (
          <div key={card.id} className='snap-start shrink-0'>
            <BrushingSessionCard
              title={card.title}
              description={card.description}
              done={card.isCompleted}
              onClick={
                card.isCompleted || !card.navigate ? undefined : () => navigate(card.navigate!)
              }
              buttonClassName='text-fg-secondary-strong'
              buttonText={card.buttonText}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrushingSessionList;
