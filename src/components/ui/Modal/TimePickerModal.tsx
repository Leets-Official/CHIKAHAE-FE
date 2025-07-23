import React from 'react';
import { useNavigate } from 'react-router-dom';
import TimePicker from '@/components/ui/TimePicker/TimePicker';

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
    <div className='w-[320px] h-[294px] rounded-[8px] bg-white shadow-lg overflow-hidden'>
      <div className='w-[320px] h-[234px] gap-[30px] pt-[30px] pr-[20px] pb-[30px] pl-[20px] flex flex-col items-center justify-center bg-white'>
        <TimePicker />
      </div>
      <div className='flex w-[320px] h-[60px] gap-[10px] opacity-100 pr-[20px] pb-[20px] pl-[20px] rotate-0'>
        <button
          onClick={onClose}
          className='w-[135px] h-[40px] pl-[12px] pr-[12px] rounded-[8px] border-[#CBD5DC] shadow-[0px_4px_0px_0px_#9CA6AF] bg-[#E9EEF2] text-sm font-semibold'
        >
          취소
        </button>
        <button
          onClick={() => {
            onConfirm();
            navigate('/mypage/alarm');
          }}
          className='w-[135px] h-[40px] pl-[12px] pr-[12px] rounded-[8px] bg-[#5FC6F0] shadow-[0px_4px_0px_0px_#3DAFD9] text-white text-sm font-semibold'
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default TimePickerModal;
