import { useState } from 'react';
import TimePickerModal from '@/components/ui/Modal/TimePickerModal';
import { useToast } from '@/contexts/ToastContext';
import AlarmList from './AlarmList';

const AlarmContent = () => {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const handleConfirm = () => {
    showToast({ message: '알람 시간이 변경되었습니다!', duration: 3000, showIcon: false });
    closeModal();
  };
  const alarms = [
    { id: 'morning', label: '아침', time: '08:00' },
    { id: 'lunch', label: '점심', time: '12:00' },
    { id: 'dinner', label: '저녁', time: '18:00' },
  ];

  return (
    <>
      <div className='w-full flex justify-center items-center min-h-[188px]'>
        <div className='w-full h-[188px] bg-bg-primary-lightgray border-[2px] border-border-lightgray rounded-[8px] border-solid flex relative top-[14px]'>
          <AlarmList alarms={alarms} onClick={() => setIsModalOpen(true)} />
        </div>
      </div>

      {/* 타임피커모달의 확인 버튼을 누르면 Toast 띄우기 */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-fg-verystrong/30 z-50'>
          <TimePickerModal
            isModalOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={handleConfirm}
            showIcon={false}
          />
        </div>
      )}
    </>
  );
};

export default AlarmContent;
