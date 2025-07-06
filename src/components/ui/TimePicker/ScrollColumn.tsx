import { motion, useMotionValue, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

type ScrollColumnProps = {
  items: string[];
  selected: string;
  onSelect: (val: string) => void;
};

// 항목 하나의 높이
const ITEM_HEIGHT = 48;
// 화면에 보이는 항목 개수
const VISIBLE_COUNT = 3;
// 가운데 항목이 정확히 중앙에 오도록 계산
const MIDDLE_OFFSET = (VISIBLE_COUNT * ITEM_HEIGHT) / 2 - ITEM_HEIGHT / 2;

export function ScrollColumn({ items, selected, onSelect }: ScrollColumnProps) {
  const y = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 선택된 항목이 변경되면 해당 항목이 가운데에 오도록 애니메이션 이동
  useEffect(() => {
    const index = items.findIndex((item) => item === selected);
    const targetY = -index * ITEM_HEIGHT + MIDDLE_OFFSET;
    animate(y, targetY, { type: 'spring', stiffness: 300 });
  }, [selected]);

  // 마우스 휠 스크롤로 항목을 선택할 수 있게 처리
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const currentY = y.get();
      const nextY = currentY - e.deltaY;

      // 스크롤 가능 범위 설정
      const minY = -((items.length - 1) * ITEM_HEIGHT) + MIDDLE_OFFSET;
      const maxY = MIDDLE_OFFSET;

      // 부드럽게 이동
      const clampedY = Math.max(minY, Math.min(maxY, nextY));
      animate(y, clampedY, { type: 'tween', duration: 0.1 });

      // 가장 가까운 항목을 선택
      const index = Math.round((MIDDLE_OFFSET - clampedY) / ITEM_HEIGHT);
      onSelect(items[index]);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [items, y, onSelect]);

  // 드래그가 끝났을 때 가장 가까운 항목으로 스냅
  const handleDragEnd = () => {
    const currentY = y.get();
    const index = Math.round((MIDDLE_OFFSET - currentY) / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(items.length - 1, index));
    const targetY = -clampedIndex * ITEM_HEIGHT + MIDDLE_OFFSET;
    animate(y, targetY, { type: 'spring', stiffness: 300 });
    onSelect(items[clampedIndex]);
  };

  return (
    <div ref={containerRef} className='relative h-[144px] w-[64px] overflow-hidden scrollbar-hide'>
      <div className='absolute top-1/2 left-0 right-0 h-[46px] -translate-y-1/2 bg-[#E9EEF2] rounded-[8px] z-10 pointer-events-none mx-2' />

      <motion.div
        drag='y'
        style={{ y }}
        dragConstraints={{
          top: -((items.length - 1) * ITEM_HEIGHT) + MIDDLE_OFFSET,
          bottom: MIDDLE_OFFSET,
        }}
        onDragEnd={handleDragEnd}
        className='flex flex-col cursor-grab relative z-20'
      >
        {items.map((item) => (
          <div
            key={item}
            className={`h-[48px] flex items-center justify-center transition-all ${
              item === selected ? 'text-black font-bold' : 'text-gray-400'
            }`}
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
