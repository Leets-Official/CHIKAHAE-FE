import React from "react";
import MenuItem from "@/pages/mypage/components/MenuItem";
import type { MenuItemType } from "@/pages/mypage/components/MenuItem";
export type MenuItem = MenuItemType;
import RightIcon from '@/assets/icons//Chevron_right.svg';

interface MenuListProps {
  items: MenuItemType[];
}

const MenuList: React.FC<MenuListProps> = ({ items }) => (
  <div className="w-[360px] h-[272px] flex flex-col">
    {items.map((item, idx) => (
      <button
        key={idx}
        className="w-[360px] h-[48px] flex items-center justify-between pt-[12px] pr-[20px] pb-[12px] pl-[20px] bg-white"
        onClick={item.onClick}
      >
        <div className="flex items-center gap-1">
          <span className="w-[58px] h-[22px] font-extrabold text-[16px] leading-[22px] tracking-tight font-[NanumSquareRound] text-left">
            {item.label}
          </span>
        </div>
        <div className="flex items-center justify-center w-[24px] h-[24px]">
          <img 
            src={RightIcon}  
            alt="Right"
            width={24}
            height={24}
            className="opacity-100"
          />
        </div>
      </button>
    ))}
  </div>
);

export default MenuList;