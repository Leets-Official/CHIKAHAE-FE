import { ScrollColumn } from './ScrollColumn';
import { useState } from 'react';
import { clsx } from 'clsx';

const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));
const PERIODS = ['AM', 'PM'];

const COLON_WRAPPER = 'relative w-[6px]';
const COLON_TEXT = clsx(
  'absolute top-1/2 left-1/2 -translate-x-1/2',
  '-translate-y-1/2', // 31.5px 대신 정중앙 배치로 대체
  'text-base font-bold text-black',
);

export default function TimePicker() {
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('00');
  const [period, setPeriod] = useState('AM');

  return (
    <div className='flex items-center gap-8'>
      <div className='flex items-center justify-center h-[189px] gap-4'>
        <ScrollColumn items={HOURS} selected={hour} onSelect={setHour} loop />
        <div className={COLON_WRAPPER}>
          <span className={COLON_TEXT}>:</span>
        </div>
        <ScrollColumn items={MINUTES} selected={minute} onSelect={setMinute} loop />
      </div>
      <ScrollColumn items={PERIODS} selected={period} onSelect={setPeriod} />
    </div>
  );
}
