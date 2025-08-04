import type { TextButtonProps } from './TextButton.types';
import { twMerge } from 'tailwind-merge';

const sizeMap: Record<
  'small' | 'medium' | 'large' | 'extralarge',
  { w: string; h: string; px: string; text: string }
> = {
  small: {
    w: 'w-[46px]',
    h: 'h-[32px]',
    px: 'px-[12px]',
    text: 'text-[12px]',
  },
  medium: {
    w: 'w-[46px]',
    h: 'h-[40px]',
    px: 'px-[12px]',
    text: 'text-[12px]',
  },
  large: {
    w: 'w-[58px]',
    h: 'h-[48px]',
    px: 'px-[16px]',
    text: 'text-[14px]',
  },
  extralarge: {
    w: 'w-[61px]',
    h: 'h-[48px]',
    px: 'px-[16px]',
    text: 'text-[16px]',
  },
};

const textStyleMap: Record<'primary' | 'default' | 'assistive', string> = {
  primary: 'text-[#F2545B]',
  default: 'text-[#181B1F]',
  assistive: 'text-[#BAC3CB]',
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
  const textStyles = textStyleMap[variant];

  return (
    <button
      disabled={disabled || isLoading}
      className={twMerge(
        baseStyles,
        sizeStyles?.w,
        sizeStyles?.h,
        sizeStyles?.px,
        sizeStyles?.text,
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
