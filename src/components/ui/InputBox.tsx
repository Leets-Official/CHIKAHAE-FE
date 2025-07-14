import Input from './Input';
import { ReactComponent as CalendarIcon } from '@/assets/images/Calendar.svg';
import { useState } from 'react';

type InputState = 'enabled' | 'select' | 'error' | 'disabled';

const stateClassMap: Record<InputState, { border: string; bg: string; icon: string }> = {
  enabled: {
    border: 'border-[#BAC3CB]',
    bg: 'bg-white',
    icon: 'text-fg-medium',
  },
  select: {
    border: 'border-[#3DAFD9]',
    bg: 'bg-white',
    icon: 'text-[#3DAFD9]',
  },
  error: {
    border: 'border-[#3DAFD9]',
    bg: 'bg-white',
    icon: 'text-[#3DAFD9]',
  },
  disabled: {
    border: 'border-[#BAC3CB]',
    bg: 'bg-[#BAC3CB]',
    icon: 'text-fg-medium',
  },
};

const InputBox = () => {
  const [state, setState] = useState<InputState>('enabled');
  const { border, bg, icon } = stateClassMap[state];
  return (
    <div
      className={`
        flex flex-col
        h-[80px] w-[320px] 
        rounded-lg border-3 border-b-5 p-4
        shadow-md
        ${border} ${bg}
      `}
    >
      <div className='flex items-center text-sm font-bold w-full'>
        <label
          className='
        flex items-center text-[12px] font-bold leading-[14px] tracking-[-0.12px] mb-[6px]'
        >
          주제
          <span className='ml-[4px] text-[14px] font-medium text-fg-accent-red'>*</span>
        </label>
      </div>
      <div className='flex justify-between'>
        <Input
          inputState = {state}
          disabled= {state === 'disabled'}
          onFocus={() => state !== 'disabled' && setState('select')}
          onBlur={() => state !== 'disabled' && setState('enabled')}
          placeholder='텍스트를 입력해 주세요.'
          className='
          w-full
          text-sm
          px-0
          py-0
          bg-transparent'
        />
        <CalendarIcon className={`h-[30px] w-[30px] ${icon}`} />
      </div>
    </div>
  );
};

export default InputBox;
