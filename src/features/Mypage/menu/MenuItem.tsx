import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as RightIcon } from '@/assets/icons/chevron_right.svg';

export interface MenuItemType {
  label: string;
  path: string;
  icon?: string;
  onClick?: () => void;
}

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(item.path)}
      className='w-full flex items-center justify-between'
    >
      <div className='flex items-center gap-1'>
        <span className='body-16-eb leading-[22px] text-fg-gray-strong'>{item.label}</span>
      </div>
      <div className='flex items-center justify-center'>
        <RightIcon className='w-[24px] h-[24px] text-fg-medium' />
      </div>
    </button>
  );
};

export default MenuItem;
