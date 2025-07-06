import { ScrollColumn } from './ScrollColumn';
import { useState } from 'react';

const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
const PERIODS = ['AM', 'PM'];

export default function TimePicker() {
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('00');
  const [period, setPeriod] = useState('AM');

  return (
    <div className='space-y-4'>
      <div className='flex gap-2 bg-white p-4 rounded-xl shadow justify-center'>
        <ScrollColumn items={HOURS} selected={hour} onSelect={setHour} />
        <div className='text-2xl font-bold flex items-center'>:</div>
        <ScrollColumn items={MINUTES} selected={minute} onSelect={setMinute} />
        <div className='text-2xl font-bold flex items-center'>:</div>
        <ScrollColumn items={PERIODS} selected={period} onSelect={setPeriod} />
      </div>
    </div>
  );
}
