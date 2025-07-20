import React from 'react';
import { useNavigate } from 'react-router-dom';
import LeftIcon from '@/assets/icons/Chevron_left.svg';

export interface PageHeaderProps {
  /** 중앙에 표시할 텍스트 */
  message: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ message }) => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <header className="relative w-full h-[44px] flex items-center px-5">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={handleBack}
        className="flex items-center justify-center w-6 h-6"
        aria-label="뒤로가기"
      >
        <img src={LeftIcon} alt="뒤로가기" className="w-6 h-6" />
      </button>

      {/* 중앙 타이틀 */}
      <span
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
                   text-[16px] font-extrabold leading-[22px] font-[NanumSquareRound]"
      >
        {message}
      </span>
    </header>
  );
};

export default PageHeader;
