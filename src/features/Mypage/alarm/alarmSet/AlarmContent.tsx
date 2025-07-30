import { useEffect, useState } from 'react';
import TimePickerModal from '@/components/ui/Modal/TimePickerModal';
import { useToast } from '@/contexts/ToastContext';
import AlarmList from './AlarmList';
import AlarmToggleItem from './AlarmToggle';
import { useAlarmSlots } from '@/hooks/queries/useAlarmQuery';
import { updateSlotTime } from '@/api/myPage/alarmAPI';
import { useSelectedAlarm } from '@/hooks/useSelectedAlarm';
import { formatTo24Hour } from '@/utils/formatSendTime';
import { Modal } from '@/components/ui/Modal';

const AlarmContent = () => {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlarmToggleOn, setIsAlarmToggleOn] = useState(false); // 토글 상태
  const [isBlockedModalOpen, setBlockedModalOpen] = useState(false); // 모달 상태 관리

  const { selectedAlarm, selectAlarm, reset } = useSelectedAlarm();
  const { data: alarmSlots = [] } = useAlarmSlots();

  //  브라우저 권한 + 서버 알림 설정 여부 확인
  useEffect(() => {
    const browserGranted = Notification.permission === 'granted';
    const allSlotsEnabled = alarmSlots.length > 0 && alarmSlots.every((slot) => slot.enabled);
    setIsAlarmToggleOn(browserGranted && allSlotsEnabled);
  }, [alarmSlots]);

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const handleConfirm = (hour: number, minute: number, period: 'AM' | 'PM') => {
    if (!selectedAlarm) return;
    const sendTime = formatTo24Hour(hour, minute, period);

    updateSlotTime(selectedAlarm.slotType, sendTime)
      .then(() => {
        showToast({ message: '알람 시간이 변경되었습니다!', duration: 3000, showIcon: false });
      })
      .catch(() => {
        showToast({ message: '시간 변경에 실패했습니다.', duration: 3000, showIcon: false });
      })
      .finally(() => closeModal());
  };

  return (
    <>
      <div className='w-full flex flex-col items-center gap-[16px]'>
        {/* 알람 토글 아이템 */}
        <AlarmToggleItem
          label='알림 허용'
          isOn={isAlarmToggleOn}
          onToggle={(newState) => {
            // 상태 반영 및 로직 처리
            setIsAlarmToggleOn(newState);
          }}
          onBlocked={() => setBlockedModalOpen(true)}
        />

        {/* 알람 리스트 박스 */}
        <div className='w-full h-[188px] bg-bg-primary-lightgray border-[2px] border-border-lightgray rounded-[8px] border-solid relative'>
          <AlarmList
            alarms={alarmSlots}
            onClick={(alarm) => {
              selectAlarm(alarm);
              setIsModalOpen(true);
            }}
          />
        </div>
      </div>

      {/* 타임피커 모달 */}
      {isModalOpen && selectedAlarm && (
        <div className='fixed inset-0 flex items-center justify-center bg-fg-verystrong/30 z-50'>
          <TimePickerModal
            isModalOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={handleConfirm}
            showIcon={false}
            defaultHour={selectedAlarm.hour}
            defaultMinute={selectedAlarm.minute}
            defaultPeriod={selectedAlarm.period}
          />
        </div>
      )}

      <Modal
        isOpen={isBlockedModalOpen}
        onClose={() => setBlockedModalOpen(false)}
        title='알림 권한이 차단되어 있어요'
        onConfirm={() => {
          // 브라우저 설정 페이지 열도록 안내
          window.open('chrome://settings/content/notifications', '_blank'); // 크롬 한정
          setBlockedModalOpen(false);
        }}
        confirmText='설정 열기'
        cancelText='닫기'
      >
        브라우저 설정에서 알림 권한을 허용해주세요.
      </Modal>
    </>
  );
};
export default AlarmContent;
