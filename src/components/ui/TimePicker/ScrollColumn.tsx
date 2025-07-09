import { motion, useMotionValue, animate } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';
import { clsx } from 'clsx';

type ScrollColumnProps = {
  items: string[];
  selected: string;
  onSelect: (val: string) => void;
  loop?: boolean;
};

const ITEM_HEIGHT = 63;
const ITEM_VISIBLE_COUNT = 3;
const SPRING_STIFFNESS = 300;
const SCROLL_DURATION = 0.1;
const REPEAT_COUNT = 15;

const MIDDLE_OFFSET = (ITEM_VISIBLE_COUNT * ITEM_HEIGHT) / 2 - ITEM_HEIGHT / 2;

export function ScrollColumn({ items, selected, onSelect, loop = false }: ScrollColumnProps) {
  const y = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 선택된 항목이 변경되면 해당 항목이 가운데에 오도록 애니메이션 이동
  const extendedItems = useMemo(() => {
    return loop ? Array.from({ length: REPEAT_COUNT }).flatMap(() => items) : items;
  }, [items, loop]);

  const baseIndex = useMemo(() => {
    if (!loop) return items.findIndex((item) => item === selected);
    const start = Math.floor((extendedItems.length - items.length) / 2);
    const end = start + items.length;
    for (let i = start; i < end; i++) {
      if (extendedItems[i] === selected) return i;
    }
    return start;
  }, [items, extendedItems, selected, loop]);

  // 마우스 휠 스크롤로 항목을 선택할 수 있게 처리
  useEffect(() => {
    const targetY = -baseIndex * ITEM_HEIGHT + MIDDLE_OFFSET;
    animate(y, targetY, { type: 'spring', stiffness: SPRING_STIFFNESS });
  }, [baseIndex]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const currentY = y.get();
      const nextY = currentY - e.deltaY;

      // 스크롤 가능 범위 설정
      const minY = -((extendedItems.length - 1) * ITEM_HEIGHT) + MIDDLE_OFFSET;
      const maxY = MIDDLE_OFFSET;

      // 부드럽게 이동
      const clampedY = Math.max(minY, Math.min(maxY, nextY));
      animate(y, clampedY, { type: 'tween', duration: SCROLL_DURATION });

      // 가장 가까운 항목을 선택
      const index = Math.round((MIDDLE_OFFSET - clampedY) / ITEM_HEIGHT);
      const nextValue = extendedItems[index];
      if (nextValue !== selected) {
        onSelect(nextValue);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => container?.removeEventListener('wheel', handleWheel);
  }, [extendedItems, y, onSelect]);

  // 드래그가 끝났을 때 가장 가까운 항목으로 스냅
  const handleDragEnd = () => {
    const currentY = y.get();
    const index = Math.round((MIDDLE_OFFSET - currentY) / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(extendedItems.length - 1, index));
    const targetY = -clampedIndex * ITEM_HEIGHT + MIDDLE_OFFSET;
    animate(y, targetY, { type: 'spring', stiffness: SPRING_STIFFNESS });
    const nextValue = extendedItems[clampedIndex];
    if (nextValue !== selected) {
      onSelect(nextValue);
    }
  };

  const selectorOverlayClass = clsx(
    'absolute',
    'top-1/2 left-1/2',
    '-translate-x-1/2 -translate-y-[31.5px]',
    'h-[48px] w-[61px]',
    'bg-[#F5F7FA] rounded-[8px]',
    'z-10 pointer-events-none',
  );

  const itemBaseClass = clsx(
    'w-[61px] h-[48px] px-4',
    'flex flex-col justify-center items-center',
    'self-stretch text-[16px] transition-all',
  );

  return (
    <div ref={containerRef} className='relative h-[189px] w-[61px] overflow-hidden scrollbar-hide'>
      <div className={selectorOverlayClass} />

      <motion.div
        drag='y'
        style={{ y }}
        dragConstraints={{
          top: -((extendedItems.length - 1) * ITEM_HEIGHT) + MIDDLE_OFFSET,
          bottom: MIDDLE_OFFSET,
        }}
        onDragEnd={handleDragEnd}
        className='flex flex-col gap-[15px] cursor-grab relative z-20'
      >
        {extendedItems.map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className={clsx(
              itemBaseClass,
              item === selected ? 'text-black font-bold' : 'text-gray-400',
            )}
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
