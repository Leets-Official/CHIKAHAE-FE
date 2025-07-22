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
}: RadioButtonContainerProps) => {
  const state: RadioButtonState = selectedValue ? 'select' : 'enabled';
  const current = stateClassMap[state];

  const containerClass = clsx(
    'w-full h-[80px] px-4 py-3 flex flex-col',
    variant === 'default' && 'rounded-lg border-[2px] border-b-5 shadow-md',
    variant !== 'default' && 'border-t border-[#9CA6AF]',
    variant === 'formTop' && 'rounded-t-lg',
    variant === 'formBottom' && 'rounded-b-lg',
    current.border,
    current.bg,
  );

  return (
    <div className={containerClass}>
      <label className='flex items-center text-[12px] font-bold leading-[14px] tracking-[-0.12px] mb-[6px]'>
        {message}
        {importance === 'important' && (
          <span className='ml-[4px] text-[14px] font-medium text-fg-accent-red'>*</span>
        )}
      </label>
      <div className='flex justify-between'>
        {options.map(({ name, value }) => (
          <RadioButton
            key={value}
            id={value}
            name='gender'
            value={value}
            message={name}
            checked={selectedValue === value}
            onChange={onValueChange}
          />
        ))}
      </div>
    </div>
  );
};

export default RadioButtonContainer;
