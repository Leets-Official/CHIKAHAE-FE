import Input from './Input';
import { ReactComponent as CalendarIcon } from '@/assets/images/calendar.svg';
import { useState } from 'react';
import clsx from 'clsx';

type InputState = 'enabled' | 'select' | 'disabled';
type Variant = 'default' | 'formTop' | 'formMiddle' | 'formBottom';

const InputContainer = ({ variant = 'default' }: { variant?: Variant }) => {
  const [state, setState] = useState<InputState>('enabled');

  const containerClass = clsx(
    'w-full h-[80px] px-4 py-3 flex flex-col',
    variant === 'default' && 'rounded-lg border-2 border-b-5 shadow-md',
    variant !== 'default' && 'border-t border-[#9CA6AF]',
    variant === 'formTop' && 'rounded-t-lg',
    variant === 'formBottom' && 'rounded-b-lg',
    {
      'border-[#9CA6AF] bg-white': state === 'enabled',
      'border-[#5fc6f0] bg-white': state === 'select',
      'border-[#9CA6AF] bg-[#BAC3CB]': state === 'disabled',
    },
  );

  const iconColor = clsx({
    'text-[#9CA6AF]': state === 'enabled' || state === 'disabled',
    'text-[#3DAFD9]': state === 'select',
  });

  return (
    <div className={containerClass}>
      <label className='flex items-center text-[12px] font-bold leading-[14px] tracking-[-0.12px] mb-[6px]'>
        주제
        <span className='ml-[4px] text-[14px] font-medium text-[#DE473D]'>*</span>
      </label>
      <div className='flex justify-between items-center'>
        <Input
          inputState={state}
          onFocus={() => setState('select')}
          onBlur={() => setState('enabled')}
          placeholder='텍스트를 입력해 주세요.'
          className='w-full text-sm px-0 py-0 bg-transparent'
        />
        <CalendarIcon className={`h-[30px] w-[30px] ${iconColor}`} />
      </div>
    </div>
  );
};

export default InputContainer;
