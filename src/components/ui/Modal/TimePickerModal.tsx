import React from 'react';
import { useNavigate } from 'react-router-dom';
import TimePicker from '@/components/ui/TimePicker/TimePicker';
import Button from '@/components/ui/Button/Button';

interface TimePickerModalProps {
  onClose: () => void;
  isModalOpen?: boolean;
  onConfirm: () => void;
  showIcon?: boolean;
}


const TimePickerModal: React.FC<TimePickerModalProps> = ({ onClose, isModalOpen, onConfirm }) => {
  const navigate = useNavigate();

  if (!isModalOpen) return null;

  return (
    <div className='w-[320px] h-[294px] rounded-[8px] bg-bg-primary-white shadow-lg overflow-hidden'>
      <div className=' h-[234px] gap-[30px] py-8.5 px-5 flex flex-col items-center justify-center'>
        <TimePicker />
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
            onConfirm();
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
