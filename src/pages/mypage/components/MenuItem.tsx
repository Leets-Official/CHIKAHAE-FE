// src/pages/MyPage/MenuItem.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import RightIcon from '@/assets/images/Chevron_right.svg';
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
      className="w-[360px] h-[48px] flex items-center justify-between pt-[12px] pr-[20px] pb-[12px] pl-[20px] bg-white"
    >
      <div className="flex items-center gap-1">
        <span className="w-[58px] h-[22px] font-extrabold text-[16px] leading-[22px] tracking-tight font-[NanumSquareRound]">
          {item.label}
        </span>
      </div>
      <div className="flex items-center justify-center w-[24px] h-[24px]">
        <img
          src={RightIcon} 
          alt="다음"
          width={24}
          height={24}
          className="opacity-100"
        />
      </div>
    </button>
  );
};

export default MenuItem;
