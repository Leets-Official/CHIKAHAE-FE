import React, { useState, useEffect } from 'react';
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

  // 애니메이션용 상태
  const [visible, setVisible] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  // 모달 열릴 때 내부 상태 초기화
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isModalOpen) {
      setHour(defaultHour);
      setMinute(defaultMinute);
      setPeriod(defaultPeriod);

      setVisible(true);
      requestAnimationFrame(() => setShowAnimation(true));
    } else {
      requestAnimationFrame(() => {
        setShowAnimation(false);
      });
      timeout = setTimeout(() => {
        setVisible(false);
      }, 200);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isModalOpen, defaultHour, defaultMinute, defaultPeriod]);

  return (
    <div
      className={`
      w-[320px] h-[294px] rounded-[8px] bg-bg-primary-white shadow-lg overflow-hidden
      transition-all duration-[200ms] transform
      ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
      ${visible ? 'pointer-events-auto' : 'pointer-events-none'}
    `}
    >
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
