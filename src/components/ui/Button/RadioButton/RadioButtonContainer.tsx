import RadioButton from './RadioButton';
import { useState } from 'react';
import clsx from 'clsx';

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

const RadioButtonContainer = ({ variant = 'default' }: { variant?: Variant }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const state: RadioButtonState = selected ? 'select' : 'enabled';
  const current = stateClassMap[state];

  const containerClass = clsx(
    'w-full h-[80px] px-4 py-3 flex flex-col',
    variant === 'default' && 'rounded-lg border-3 border-b-5 shadow-md',
    variant !== 'default' && 'border-t border-[#9CA6AF]',
    variant === 'formTop' && 'rounded-t-lg',
    variant === 'formBottom' && 'rounded-b-lg',
    current.border,
    current.bg,
  );

  const getRadioState = (value: string) => {
    return selected === value ? 'select' : 'enabled';
  };

  return (
    <div className={containerClass}>
      <label className='flex items-center text-[12px] font-bold leading-[14px] tracking-[-0.12px] mb-[6px]'>
        주제
        <span className='ml-[4px] text-[14px] font-medium text-fg-accent-red'>*</span>
      </label>
      <div className='flex justify-between'>
        {['male', 'female', 'any'].map((value) => (
          <RadioButton
            key={value}
            id={value}
            name='gender'
            value={value}
            label='텍스트'
            checked={selected === value}
            onChange={setSelected}
            radioState={getRadioState(value)}
          />
        ))}
      </div>
    </div>
  );
};

export default RadioButtonContainer;
