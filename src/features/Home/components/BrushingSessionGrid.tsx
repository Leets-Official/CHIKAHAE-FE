import React from 'react';
import { brushingCards } from '@/features/Home/constants/brushingSessions';
import BrushingSessionCard from '@/features/Home/components/BrushingSessionCard';

const BrushingSessionGrid: React.FC = () => {
  const [doneList, setDoneList] = React.useState<Record<string, boolean>>({});

  const handleCardClick = (id: string) => {
    setDoneList(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex overflow-x-auto gap-4 px-4 py-2">
      {brushingCards.map(card => (
        <BrushingSessionCard
          key={card.id}
          title={card.title}
          description={card.description}
          done={!!doneList[card.id]}
          onClick={() => handleCardClick(card.id)}
        />
      ))}
    </div>
  );
};

export default BrushingSessionGrid;