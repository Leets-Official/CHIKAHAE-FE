import { ReactComponent as RightIcon } from '@/assets/icons/chevron_right.svg';
import type { AlarmSlot } from '@/api/myPage/alarmAPI';
import type { SlotType } from '@/api/myPage/alarmAPI';

interface AlarmListProps {
  alarms: AlarmSlot[];
  onClick: (alarm: AlarmSlot) => void;
}

// ex. hour: 2, minute: 30 -> 02:30
const formatTime = (hour: number, minute: number) => {
  const paddedHour = String(hour).padStart(2, '0');
  const paddedMinute = String(minute).padStart(2, '0');
  return `${paddedHour}:${paddedMinute}`;
};

// ex. MORNING -> 아침
const translateSlotType = (slotType: SlotType) => {
  switch (slotType) {
    case 'MORNING':
      return '아침';
    case 'LUNCH':
      return '점심';
    case 'EVENING':
      return '저녁';
    default:
      return '';
  }
};

const AlarmList = ({ alarms, onClick }: AlarmListProps) => {
  return (
    <div className='relative top-[14px] gap-[8px] flex flex-col px-[20px]'>
      {alarms.map((alarm) => (
        <div key={alarm.slotType} className='flex justify-between px-[20px] py-[12px]'>
          <span className='flex items-center justify-center body-16-eb text-fg-gray-strong'>
            {translateSlotType(alarm.slotType)}
          </span>
          <div className='w-[72px] h-[24px] flex items-center justify-between text-fg-medium body-16-b'>
            <span className='flex items-center justify-center body-16-b'>
              {formatTime(alarm.sendTime.hour, alarm.sendTime.minute)}
            </span>
            <button type='button' onClick={() => onClick(alarm)}>
              <RightIcon className='text-fg-medium' />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlarmList;
