import RadioButton from './RadioButton';
import { useState } from 'react';

type RadioButtonState = 'enabled' | 'select' | 'disabled';

const stateClassMap: Record<RadioButtonState, { border: string; bg: string }> = {
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

const RadioButtonContainer = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [globalState] = useState<RadioButtonState>('enabled');

  const containerState = globalState === 'disabled' ? 'disabled' : selected ? 'select' : 'enabled';

  const { border, bg } = stateClassMap[containerState];

  const getRadioState = (value: string): RadioButtonState => {
    if (globalState === 'disabled') return 'disabled';
    return selected === value ? 'select' : 'enabled';
  };

  return (
    <div
      className={`
        flex flex-col
        h-[80px] w-[320px] 
        rounded-lg border-3 border-b-5 p-4
        shadow-md ${border} ${bg}
      `}
    >
      <div className='flex items-center text-sm font-bold w-full'>
        <label className='flex items-center text-[12px] font-bold leading-[14px] tracking-[-0.12px] mb-[6px]'>
          주제
          <span className='ml-[4px] text-[14px] font-medium text-fg-accent-red'>*</span>
        </label>
      </div>
      <div className='flex justify-between'>
        <RadioButton
          id='male'
          name='gender'
          value='male'
          label='텍스트'
          checked={selected === 'male'}
          onChange={setSelected}
          radioState={getRadioState('male')}
        />
        <RadioButton
          id='female'
          name='gender'
          value='female'
          label='텍스트'
          checked={selected === 'female'}
          onChange={setSelected}
          radioState={getRadioState('female')}
        />
        <RadioButton
          id='any'
          name='gender'
          value='any'
          label='텍스트'
          checked={selected === 'any'}
          onChange={setSelected}
          radioState={getRadioState('any')}
        />
      </div>
    </div>
  );
};

export default RadioButtonContainer;
