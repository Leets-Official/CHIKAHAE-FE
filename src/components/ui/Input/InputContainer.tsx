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

const getBorderColor = (inputState: InputState, isActive?: boolean) => {
  if (inputState === 'select') return 'border-[#5fc6f0]';
  if (isActive) return 'border-[#5fc6f0]';
  if (inputState === 'disabled') return 'border-gray-400';
  return 'border-[#9CA6AF]';
};

const InputContainer = ({
  variant = 'default',
  placeholder = '텍스트를 입력해 주세요',
  label = '예시',
  calender = false,
  star = false,
  className,
  value,
  isActive,
  onChange,
}: InputContainerProps) => {
  const [inputState, setinputState] = useState<InputState>('enabled');
  const borderColorClass = getBorderColor(inputState, isActive);

  const containerClass = clsx(
    'h-[80px] px-4 py-3 flex flex-col gap-y-1 justify-center items-start',
    variant === 'default' && 'rounded-lg border-[2px] border-b-[5px] shadow-md',
    (variant === 'formMiddle' || variant === 'formTop') && 'border-b',
    borderColorClass,
    variant === 'formTop' && 'rounded-t-lg',
    variant === 'formBottom' && 'rounded-b-lg',
    {
      'bg-white': inputState === 'enabled' || inputState === 'select',
      'bg-[#BAC3CB]': inputState === 'disabled',
    },
    className,
  );
  const handleFocus = () => setinputState('select');
  const handleBlur = () => setinputState('enabled');
  return (
    <div className={containerClass}>
      <label className='flex items-center text-[12px] font-bold leading-[14px] tracking-[-0.12px]  '>
        {label}
        {star && <span className='ml-[4px] text-[14px] font-medium text-fg-accent-red'>*</span>}
      </label>

      {calender ? (
        <div className='w-full' tabIndex={-1} onFocus={handleFocus} onBlur={handleBlur}>
          <DateInput
            value={value}
            onChange={(val) => {
              if (typeof onChange === 'function') {
                (onChange as (formattedDate: string) => void)(val);
              }
            }}
            state={inputState}
          />
        </div>
      ) : (
        <Input
          inputState={inputState}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
        />
      )}
    </div>
  );
};

export default InputContainer;
