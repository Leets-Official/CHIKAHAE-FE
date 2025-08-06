import RadioButton from './RadioButton';
import clsx from 'clsx';
import { GENDER } from '@/constants/radioOptions';

interface RadioButtonContainerProps {
  variant?: Variant;
  message?: string;
  importance?: 'important' | 'basic';
  options: { name: string; value: string }[];
  className?: string;
  selectedValue: string | null;
  onValueChange: (value: string) => void;
  isActive?: boolean;
}

type RadioButtonState = 'enabled' | 'select' | 'disabled';
type Variant = 'default' | 'formTop' | 'formMiddle' | 'formBottom';

const stateClassMap = {
  enabled: {
    border: 'border-[#9CA6AF]',
    bg: 'bg-white',
  },
  select: {
    border: 'border-[#5fc6f0]',
    bg: 'bg-white',
  },
  disabled: {
    border: 'border-[#9CA6AF]',
    bg: 'bg-[#BAC3CB]',
  },
};

const RadioButtonContainer = ({
  variant = 'default',
  message = '성별',
  importance = 'important',
  options = GENDER,
  selectedValue,
  onValueChange,
  isActive,
}: RadioButtonContainerProps) => {
  const state: RadioButtonState = selectedValue ? 'select' : 'enabled';
  const current = stateClassMap[state];

  const containerClass = clsx(
    'w-full h-[80px] px-[16px] py-[16px] flex flex-col justify-center items-start gap-[4px]',
    variant === 'default' && 'rounded-lg border-[2px] border-b-5 shadow-md',
    (variant === 'formMiddle' || variant === 'formTop') && 'border-b',
    isActive ? 'border-b-[#5fc6f0]' : 'border-b-[#9CA6AF]',
    variant === 'formBottom' && 'rounded-b-lg',
    current.border,
    current.bg,
  );

  return (
    <div className={containerClass}>
      <label className='flex h-full items-center body-12-eb tracking-[-0.12px]'>
        {message}
        {importance === 'important' && (
          <span className='ml-[4px] body-12-r text-fg-accent-red'>*</span>
        )}
      </label>
      <div className='flex h-[20px] gap-x-[20px] flex-1 w-full pl-[1px]'>
        {options.map(({ name, value }) => (
          <RadioButton
            key={value}
            id={value}
            name='gender'
            value={value}
            message={name}
            checked={selectedValue === value}
            onChange={onValueChange}
            isActive={isActive}
          />
        ))}
      </div>
    </div>
  );
};

export default RadioButtonContainer;
