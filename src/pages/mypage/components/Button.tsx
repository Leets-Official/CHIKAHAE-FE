import React from "react";

interface ButtonProps {
  disabled?: boolean;
  label: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  disabled = false,
  label,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        `w-[320px] h-[48px] flex items-center justify-center gap-[8px] px-[16px] rounded-[8px] border border-[1px] border-solid border-[#5FC6F0] ` +
        `bg-[#5FC6F0] shadow-[0_4px_0_0_var(--shadowbluemedium,#5FC6F0)] opacity-100` +
        (disabled ? " opacity-50 cursor-not-allowed" : "")
      }
      style={{ transform: "rotate(0deg)" }}
    >
      <span className="text-white text-[16px] font-bold">{label}</span>
    </button>
  );
};

export default Button;
