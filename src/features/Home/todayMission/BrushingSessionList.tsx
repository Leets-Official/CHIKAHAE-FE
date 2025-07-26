import React, { useRef, useState, useCallback, useEffect } from 'react';
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
  const frameRef = useRef<number | null>(null);
  const scrollLeftRef = useRef(0);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // 마우스 버튼 누를 때
  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    scrollLeftRef.current = sliderRef.current.scrollLeft;
  }, []);

  // 마우스 움직일 때
  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !sliderRef.current) return;
      e.preventDefault();

      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      frameRef.current = requestAnimationFrame(() => {
        const x = e.pageX - sliderRef.current!.offsetLeft;
        const walk = (x - startX) * 1;
        sliderRef.current!.scrollLeft = scrollLeftRef.current - walk;
      });
    },
    [isDragging, startX],
  );

  // 마우스 뗄 때
  const stopDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      ref={sliderRef}
      className={`relative pb-[8px] w-full snap-x scroll-smooth overflow-x-auto overflow-y-hidden flex no-scrollbar select-none mt-[18px] 
        ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
        `}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      <div className='flex gap-[15px] pl-[2px] pr-[2px]'>
        {cards.map((card, idx) => (
          <div key={card.id} className='snap-start shrink-0'>
            <BrushingSessionCard
              title={card.title}
              description={card.description}
              done={doneList[idx]}
              onClick={() => handleDone(idx)}
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
