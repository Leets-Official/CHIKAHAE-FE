import { ScrollColumn } from './ScrollColumn';
import { useState } from 'react';

const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));
const PERIODS = ['AM', 'PM'];

export default function TimePicker() {
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('00');
  const [period, setPeriod] = useState('AM');

  return (
    <div className='flex gap-[30px] items-center'>
      <div className='flex items-center justify-center h-[189px] gap-[16px]'>
        <ScrollColumn items={HOURS} selected={hour} onSelect={setHour} />
        <div className='relative w-[6px]'>
          <span className='absolute top-1/2 -translate-y-[22px] left-1/2 -translate-x-1/2 text-[16px] font-bold text-black'>
            :
          </span>
        </div>
        <ScrollColumn items={MINUTES} selected={minute} onSelect={setMinute} />
      </div>
      <ScrollColumn items={PERIODS} selected={period} onSelect={setPeriod} />
    </div>
  );
}
