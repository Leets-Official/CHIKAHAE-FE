import Input from './Input';
import { useState } from 'react';
import clsx from 'clsx';
import DateInput from './DateInput';

type InputState = 'enabled' | 'select' | 'disabled';
type Variant = 'default' | 'formTop' | 'formMiddle' | 'formBottom';

type InputContainerProps = {
  variant?: Variant;
  placeholder?: string;
  label?: string;
  calender?: boolean;
  star?: boolean;
  className?: string;
  value: string;
  isActive?: boolean;
  onChange: ((e: React.ChangeEvent<HTMLInputElement>) => void) | ((formattedDate: string) => void);
};

const InputContainer = ({
  variant = 'default',
  placeholder = '텍스트를 입력해 주세요',
  label = '예시',
  calender = false,
  star = false,
  className,
  value,
  onChange,
  isActive = false,
}: InputContainerProps) => {
  const [internalState, setInternalState] = useState<InputState>('enabled');
  const borderColorClass = isActive ? 'border-[#5fc6f0]' : 'border-[#9CA6AF]';

  const containerClass = clsx(
    'h-[80px] px-4 py-3 flex flex-col gap-y-1 justify-center items-start',
    variant === 'default' && 'rounded-lg border-[2px] border-b-[5px] shadow-md',
    (variant === 'formMiddle' || variant === 'formTop') && 'border-b',
    borderColorClass,
    variant === 'formTop' && 'rounded-t-lg',
    variant === 'formBottom' && 'rounded-b-lg',
    {
      'bg-white': internalState === 'enabled' || internalState === 'select',
      'bg-[#BAC3CB]': internalState === 'disabled',
    },
    className,
  );

  const iconColor = clsx({
    'text-[#9CA6AF]': internalState === 'enabled' || internalState === 'disabled',
    'text-[#3DAFD9]': internalState === 'select',
  });

  return (
    <div className={containerClass}>
      <label className='flex items-center text-[12px] font-bold leading-[14px] tracking-[-0.12px]  '>
        {label}
        {star && <span className='ml-[4px] text-[14px] font-medium text-fg-accent-red'>*</span>}
      </label>

      {calender ? (
        <DateInput
          value={value}
          onChange={(val) => {
            if (typeof onChange === 'function') {
              (onChange as (formattedDate: string) => void)(val);
            }
          }}
          iconColor={iconColor}
          onFocus={() => setInternalState('select')}
          onBlur={() => setInternalState('enabled')}
          state='select'
        />
      ) : (
        <Input
          inputState={internalState}
          placeholder={placeholder}
          onFocus={() => setInternalState('select')}
          onBlur={() => setInternalState('enabled')}
          value={value}
          onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
        />
      )}
    </div>
  );
};

export default InputContainer;
