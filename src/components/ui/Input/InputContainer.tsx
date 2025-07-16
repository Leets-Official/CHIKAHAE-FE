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
}: InputContainerProps) => {
  const [state, setState] = useState<InputState>('enabled');

  const containerClass = clsx(
    'h-[80px] px-4 py-3 flex flex-col gap-y-1 justify-center items-start',
    variant === 'default' && 'rounded-lg border-[2px] border-b-[5px] shadow-md',
    variant !== 'default' && 'border-t border-[#9CA6AF]',
    variant === 'formTop' && 'rounded-t-lg',
    variant === 'formBottom' && 'rounded-b-lg',
    {
      'border-[#9CA6AF] bg-white': state === 'enabled',
      'border-[#5fc6f0] bg-white': state === 'select',
      'border-[#9CA6AF] bg-[#BAC3CB]': state === 'disabled',
    },
    className,
  );

  const iconColor = clsx({
    'text-[#9CA6AF]': state === 'enabled' || state === 'disabled',
    'text-[#3DAFD9]': state === 'select',
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
            // 타입 좁히기: calender === true → string을 받는 onChange
            if (typeof onChange === 'function') {
              (onChange as (formattedDate: string) => void)(val);
            }
          }}
        />
      ) : (
        <Input
          inputState={state}
          placeholder={placeholder}
          onFocus={() => setState('select')}
          onBlur={() => setState('enabled')}
          value={value}
          onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
          className='text-sm px-0 py-0 bg-transparent'
        />
      )}
    </div>
  );
};

export default InputContainer;
