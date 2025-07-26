import React from 'react';
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


const BrushingSessionList: React.FC<Props> = ({ cards, doneList, handleDone }) => (
  <div className="relative pb-[8px] w-full h-full snap-x scroll-smooth overflow-x-auto overflow-y-visible flex gap-[15px] pl-6 pr-6 no-scrollbar">
    {cards.map((card, idx) => (
      <div key={card.id} className="snap-start">
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

export default BrushingSessionList;
