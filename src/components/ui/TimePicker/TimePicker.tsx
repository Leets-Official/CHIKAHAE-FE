import { ScrollColumn } from './ScrollColumn';

interface TimePickerProps {
  hour: string;
  minute: string;
  period: 'AM' | 'PM';
  setHour: (value: string) => void;
  setMinute: (value: string) => void;
  setPeriod: (value: 'AM' | 'PM') => void;
}

const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));
const PERIODS: ('AM' | 'PM')[] = ['AM', 'PM'];

export default function TimePicker({
  hour,
  minute,
  period,
  setHour,
  setMinute,
  setPeriod,
}: TimePickerProps) {
  return (
    <div className='flex gap-[30px] items-center'>
      <div className='flex items-center justify-center h-[189px] gap-[16px]'>
        <ScrollColumn items={HOURS} selected={hour} onSelect={setHour} />
        <span className='text-[16px] font-bold text-black'>:</span>
        <ScrollColumn items={MINUTES} selected={minute} onSelect={setMinute} />
      </div>
      <ScrollColumn items={PERIODS} selected={period} onSelect={setPeriod} />
    </div>
  );
}
