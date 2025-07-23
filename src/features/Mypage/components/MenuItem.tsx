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
      className='w-[360px] h-[48px] flex items-center justify-between pt-[12px] pr-[20px] pb-[12px] pl-[20px] bg-white'
    >
      <div className='flex items-center gap-1'>
        <span className='w-[58px] h-[22px] font-extrabold text-[16px] leading-[22px] tracking-tight font-[NanumSquareRound]'>
          {item.label}
        </span>
      </div>
      <div className='flex items-center justify-center'>
        <RightIcon className='w-[24px] h-[24px] text-[#BAC3CB]' />
      </div>
    </button>
  );
};

export default MenuItem;
