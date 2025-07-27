import React, { useState } from 'react';
import TextIcon from '@/assets/images/text.svg';
import { useNavigate } from 'react-router-dom';
import type { FieldKey } from '@/features/Mypage/constants/fieldConfig';

export interface EditMenuItemType {
  key: FieldKey;
  label: string;
  path: string;
  icon?: string;
  onClick?: () => void;
}

interface MenuItemProps {
  item: EditMenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const [showIcon, setShowIcon] = useState(false);
  const handleTextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowIcon(true);
    setTimeout(() => {
      navigate(item.path);
    }, 200); // 아이콘 보여주고 0.2초 뒤 이동
  };
  return (
    <button
      onClick={item.onClick}
      className='w-[360px] h-[48px] flex items-center justify-between pt-[12px] pr-[20px] pb-[12px] pl-[20px] bg-white'
    >
      <div className='flex items-center gap-1'>
        <span className='w-[58px] h-[22px] font-extrabold text-[16px] leading-[22px] tracking-tight font-[NanumSquareRound] text-left'>
          {item.label}
        </span>
      </div>
      {showIcon ? (
        <div className='flex items-center gap-[4px]'>
          <img
            src={TextIcon}
            alt='텍스트 아이콘'
            className='w-[72px] h-[24px] opacity-100'
            style={{ transform: 'rotate(0deg)' }}
          />
        </div>
      ) : (
        <span
          role='button'
          className='w-[44px] h-[19px] flex items-center justify-center gap-[4px] text-center font-[NanumSquareRound] font-bold text-[16px] leading-[19px] tracking-[-0.01em] text-[#BAC3CB] opacity-100 rounded'
          style={{
            fontWeight: 700,
            fontStyle: 'Bold',
            letterSpacing: '-1%',
            transform: 'rotate(0deg)',
          }}
          onClick={handleTextClick}
        >
          텍스트
        </span>
      )}
    </button>
  );
};

export default MenuItem;
