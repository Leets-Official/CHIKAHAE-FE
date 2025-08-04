import React from 'react';
import MenuItem from '@/features/Mypage/menu/MenuItem';
import type { MenuItemType } from '@/features/Mypage/menu/MenuItem';
export type MenuItem = MenuItemType;
import { ReactComponent as RightIcon } from '@/assets/icons/chevron_right.svg';

interface MenuListProps {
  items: MenuItemType[];
}

const MenuList: React.FC<MenuListProps> = ({ items }) => (
  <div className='w-full flex flex-col'>
    {items.map((item, idx) => (
      <button
        key={idx}
        className='w-full flex items-center justify-between px-[20px] py-[12px]'
        onClick={item.onClick}
      >
        <div className='flex items-center gap-1'>
          <span className='body-16-eb leading-[22px] tracking-tight text-left'>{item.label}</span>
        </div>
        <div className='flex items-center justify-center w-[24px] h-[24px]'>
          <RightIcon className='text-fg-medium' />
        </div>
      </button>
    ))}
  </div>
);

export default MenuList;
