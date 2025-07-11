import type { TextButtonProps } from "./TextButton.types";
import { twMerge } from 'tailwind-merge';

const sizeMap: Record<
  'small' | 'medium' | 'large' | 'maxi',
  { w: string; h: string; px: string;}
> = {
  small: {
    w: 'w-[46px]',
    h: 'h-[32px]',
    px: 'px-[12px]',
  },

  medium: {
    w: 'w-[46px]',
    h: 'h-[40px]',
    px: 'px-[12px]',
  },
  large: {
    w: 'w-[58px]',
    h: 'h-[48px]',
    px: 'px-[16px]',
  },
  maxi: {
    w: 'w-[61px]',
    h: 'h-[48px]',
    px: 'px-[16px]',
  },
};

const textStyleMap: Record<'primary' | 'default' | 'assistive',
Record<'small' | 'medium' | 'large' | 'maxi',string>> = {
  primary: {
    small: 'text-[#F2545B] text-[12px]',
    medium: 'text-[#F2545B] text-[12px]',
    large: 'text-[#F2545B] text-[14px]',
    maxi: 'text-[#F2545B] text-[16px]',
  },
  default: {
    small: 'text-[#181B1F] text-[12px]',
    medium: 'text-[#181B1F] text-[12px]',
    large: 'text-[#181B1F] text-[14px]',
    maxi: 'text-[#181B1F] text-[16px]',
  },
  assistive: {
    small: 'text-[#BAC3CB] text-[12px]',
    medium: 'text-[#BAC3CB] text-[12px]',
    large: 'text-[#BAC3CB] text-[14px]',
    maxi: 'text-[#BAC3CB] text-[16px]',
  },
};

// size, variant 타입을 명확히 지정
const TextButton: React.FC<TextButtonProps> = ({
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
  const textStyles = textStyleMap[variant][size];

  return (
    <button
      disabled={disabled || isLoading}
      className={twMerge(
        baseStyles,
        sizeStyles?.w,
        sizeStyles?.h,
        sizeStyles?.px,
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

export default TextButton;
