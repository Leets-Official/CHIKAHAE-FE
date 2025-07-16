import React from 'react';
import type { ButtonProps } from './Button.types';
import { twMerge } from 'tailwind-merge';

// 타입 명시 추가
const sizeMap: Record<
  'small' | 'medium' | 'large',
  { w: string; h: string; px: string; text: string }
> = {
  small: {
    w: 'w-[46px]',
    h: 'h-[32px]',
    px: 'px-[12px]',
    text: 'text-[10px]',
  },
  medium: {
    w: 'w-[46px]',
    h: 'h-[40px]',
    px: 'px-[12px]',
    text: 'text-[10px]',
  },
  large: {
    w: 'w-[58px]',
    h: 'h-[48px]',
    px: 'px-[16px]',
    text: 'text-[12px]',
  },
};

// size, variant 타입을 명확히 지정
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'assistive',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  disabled,
  className,
  ...props
}) => {
  const baseStyles =
    'flex flex-col justify-center items-center gap-[8px] rounded-[8px] font-semibold transition-all duration-200';

  const sizeStyles = sizeMap[size];

  let variantStyles = '';
  let textStyles = '';

  if (variant === 'primary') {
    if (disabled) {
      variantStyles = 'bg-[#E9EEF2]';
      textStyles = 'text-[#CDC6DD]';
    } else {
      variantStyles = 'bg-[#5FC6F0] text-white shadow-[0_4px_0_0_#3DAFD9]';
      textStyles = 'text-[#FAFBFC]';
    }
  } else if (variant === 'assistive') {
    if (disabled) {
      variantStyles = 'bg-[#E9EEF2]';
      textStyles = 'tetx-[#CED6DD]';
    } else {
      variantStyles = 'bg-[#DCE3E8] text-black border border-[#DCE3E8] shadow-[0_4px_0_0_#9CA6AF]';
      textStyles = 'test-black';
    }
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={twMerge(
        baseStyles,
        sizeStyles?.w,
        sizeStyles?.h,
        sizeStyles?.px,
        sizeStyles?.text,
        variantStyles,
        textStyles,
        fullWidth && 'w-full',
        (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {isLoading ? '로딩중...' : children}
    </button>
  );
};

export default Button;
