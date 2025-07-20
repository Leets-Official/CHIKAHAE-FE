import React from "react";

interface ChikaButtonProps {
  imgSrc: string;
  onClick?: () => void;
}

const ChikaButton: React.FC<ChikaButtonProps> = ({ imgSrc, onClick }) => (
  <div className="w-[320px] h-[64px] flex items-center justify-between px-[8px] opacity-100 bg-white overflow-hidden">
    <button className="w-full h-full" onClick={onClick}>
      <img src={imgSrc} alt="치카 버튼" className="object-contain w-full h-full" />
    </button>
  </div>
);

export default ChikaButton;