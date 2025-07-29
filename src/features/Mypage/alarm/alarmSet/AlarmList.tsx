import { ReactComponent as RightIcon } from '@/assets/icons/chevron_right.svg';

type Alarm = {
  id: string;
  label: string;
  time: string;
};

interface AlarmListProps {
  alarms: Alarm[];
  onClick: (id: string) => void;
}

const AlarmList = ({ alarms, onClick }: AlarmListProps) => {
  return (
    <div className='relative h-[160px] top-[14px] gap-[8px] flex flex-col'>
      {alarms.map((alarm) => (
        <div key={alarm.id} className='w-[430px] h-[48px] flex justify-between px-[20px] py-[12px]'>
          <span className='flex items-center justify-center body-16-eb text-fg-gray-strong'>
            {alarm.label}
          </span>
          <div className='w-[72px] h-[24px] flex items-center justify-between text-fg-medium body-16-b'>
            <span className='flex items-center justify-center body-16-b'>{alarm.time}</span>
            <button type='button' onClick={() => onClick(alarm.id)}>
              <RightIcon className='text-fg-medium' />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlarmList;
