import React, { useRef, useState, useCallback } from 'react';
import BrushingSessionCard from './BrushingSessionCard';

export interface BrushingCardConfig {
  id: string;
  title: string;
  description: string;
  route?: string;
  buttonText: string;
}

interface Props {
  cards: BrushingCardConfig[];
  doneList: boolean[];
  handleDone: (idx: number) => void;
}

const BrushingSessionList: React.FC<Props> = ({ cards, doneList, handleDone }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 마우스 버튼 누를 때
  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  }, []);

  // 마우스 움직일 때
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1; // 스크롤 속도 조절
    sliderRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  // 마우스 뗄 때
  const stopDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      ref={sliderRef}
      className={
        `relative pb-[8px] w-full h-full snap-x scroll-smooth overflow-x-auto overflow-y-visible flex gap-[15px] pl-6 pr-6 no-scrollbar select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`
      }
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      {cards.map((card, idx) => (
        <div key={card.id} className={`snap-start`}>
          <BrushingSessionCard
            title={card.title}
            description={card.description}
            done={doneList[idx]}
            onClick={() => handleDone(idx)}
            buttonClassName="text-fg-secondary-strong"
            buttonText={card.buttonText}
          />
        </div>
      ))}
    </div>
  );
};

export default BrushingSessionList;
