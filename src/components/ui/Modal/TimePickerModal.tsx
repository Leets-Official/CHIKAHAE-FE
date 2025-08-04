import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimePicker from '@/components/ui/TimePicker/TimePicker';
import Button from '@/components/ui/Button/Button';

interface TimePickerModalProps {
  onClose: () => void;
  isModalOpen?: boolean;
  onConfirm: (hour: number, minute: number, period: 'AM' | 'PM') => void;
  showIcon?: boolean;
  defaultHour: string;
  defaultMinute: string;
  defaultPeriod: 'AM' | 'PM';
}

const TimePickerModal: React.FC<TimePickerModalProps> = ({
  onClose,
  isModalOpen,
  onConfirm,
  defaultHour,
  defaultMinute,
  defaultPeriod,
}) => {
  const navigate = useNavigate();

  const [hour, setHour] = useState(defaultHour);
  const [minute, setMinute] = useState(defaultMinute);
  const [period, setPeriod] = useState<'AM' | 'PM'>(defaultPeriod);

  if (!isModalOpen) return null;

  return (
    <div className='w-[320px] h-[294px] rounded-[8px] bg-bg-primary-white shadow-lg overflow-hidden'>
      <div className=' h-[234px] gap-[30px] py-8.5 px-5 flex flex-col items-center justify-center'>
        <TimePicker
          hour={hour}
          minute={minute}
          period={period}
          setHour={setHour}
          setMinute={setMinute}
          setPeriod={setPeriod}
        />
      </div>
      <div className='flex h-[60px] gap-[10px] px-[20px] pb-[20px]'>
        <Button
          variant='assistive'
          onClick={onClose}
          className='w-[135px] h-[40px] px-[12px] body-14-eb'
        >
          취소
        </Button>
        <Button
          variant='primary'
          onClick={() => {
            onConfirm(Number(hour), Number(minute), period);
            navigate('/mypage/alarm');
          }}
          className='w-[135px] h-[40px] px-[12px] body-14-eb'
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default TimePickerModal;
