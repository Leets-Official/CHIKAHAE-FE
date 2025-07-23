import { useState } from 'react';
import { ReactComponent as RightIcon } from "@/assets/icons/chevron_right.svg";
import TimePickerModal from '@/components/ui/Modal/TimePickerModal';
import { useToast } from '@/contexts/ToastContext';

// ModalType 타입 정의
type ModalType = 'timePickerModal' | null;

const ChikaAlarm = () => {
  const { showToast } = useToast();
  const [modalType, setModalType] = useState<ModalType>(null);
  const closeModal = () => setModalType(null);
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
      <div>
        {/* 알람 리스트 */}
        <div className='w-[320px] h-[188px] bg-[#F5F7FA] border-[2px] border-[#DCE3E8] rounded-[8px] border-solid flex relative top-[14px]'>
          <div className='relative w-[320px] h-[160px] top-[14px] gap-[8px] flex flex-col'>
            {alarms.map((alarm) => (
              <div
                key={alarm.id}
                className='w-[320px] h-[48px] flex justify-between pt-[12px] pr-[20px] pb-[12px] pl-[20px]'
              >
                <span className='flex items-center justify-center body-16-eb'>{alarm.label}</span>
                <div
                  className='w-[72px] h-[24px] flex items-center justify-between body-16-b'
                  style={{ color: 'var(--color-fg-medium)' }}
                >
                  <span className='flex items-center justify-center body-16-b'>{alarm.time}</span>
                  <button type='button' onClick={() => setModalType('timePickerModal')}>
                    <RightIcon className='text-[#BAC3CB]' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 타임피커모달의 확인 버튼을 누르면 Toast 띄우기 */}
      {modalType && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/30 z-50'>
          <TimePickerModal
            isModalOpen={modalType === 'timePickerModal'}
            onClose={closeModal}
            onConfirm={handleConfirm}
            showIcon={false}
          />
        </div>
      )}
    </>
  );
};

export default ChikaAlarm;
