import React, { useState } from 'react';
import Toggle from '@/components/ui/Toggle/Toggle';

interface AlarmToggleItemProps {
  label: string;
  initialState?: boolean;
  onToggle?: (newState: boolean) => void;
}

const AlarmToggleItem: React.FC<AlarmToggleItemProps> = ({
  label,
  initialState = false,
  onToggle,
}) => {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = (newState: boolean) => {
    setIsOn(newState);
    onToggle?.(newState);
  };

  return (
    <div className='w-full flex items-center justify-between mt-[24px] py-[12px]'>
      <span className=' body-16-eb leading-[22px] text-fg-gray-strong'>{label}</span>
      <Toggle isOn={isOn} onToggle={handleToggle} />
    </div>
  );
};

export default AlarmToggleItem;
