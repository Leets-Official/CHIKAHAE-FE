import StoreItemCard from './StoreItemCard';
import { TOOTHBRUSH_ITEMS } from '@/constants/storeItems';
import { useState } from 'react';

export const StoreItemList: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      {/* 카드 리스트 */}
      <div className="flex gap-[15px] pl-[2px] pr-[2px]">
        {TOOTHBRUSH_ITEMS.map((item) => (
          <div key={item.id} className="snap-start shrink-0">
            <StoreItemCard
              id={item.id}
              icon={item.icon}
              price={item.price}
              active={selectedId === item.id}
              onClick={() => setSelectedId(item.id)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default StoreItemList;