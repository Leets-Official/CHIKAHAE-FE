import React from 'react';
import MenuItem from '@/features/Mypage/components/MenuItem';
import type { MenuItemType } from '@/features/Mypage/components/MenuItem';
export type MenuItem = MenuItemType;
import { ReactComponent as RightIcon } from '@/assets/icons/chevron_right.svg';

interface MenuListProps {
  items: MenuItemType[];
}

const MenuList: React.FC<MenuListProps> = ({ items }) => (
  <div className='w-[360px] h-[272px] flex flex-col'>
    {items.map((item, idx) => (
      <button
        key={idx}
        className='w-[360px] h-[48px] flex items-center justify-between pt-[12px] pr-[20px] pb-[12px] pl-[20px] bg-white'
        onClick={item.onClick}
      >
        <div className='flex items-center gap-1'>
          <span className='w-[58px] h-[22px] font-extrabold text-[16px] leading-[22px] tracking-tight font-[NanumSquareRound] text-left'>
            {item.label}
          </span>
        </div>
        <div className='flex items-center justify-center w-[24px] h-[24px]'>
          <RightIcon className='text-[#BAC3CB]' />
        </div>
      </button>
    ))}
  </div>
);

export default MenuList;
