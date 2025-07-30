import Toggle from '@/components/ui/Toggle/Toggle';

interface AlarmToggleItemProps {
  label: string;
  isOn: boolean;
  onToggle?: (newState: boolean) => void;
  onBlocked?: () => void; // 권한 차단 시 처리용 콜백
}

const AlarmToggleItem: React.FC<AlarmToggleItemProps> = ({ label, isOn, onToggle, onBlocked }) => {
  const handleToggle = async (newState: boolean) => {
    if (newState) {
      const permission = Notification.permission;

      if (permission === 'granted') {
        onToggle?.(true);
      } else if (permission === 'default') {
        const result = await Notification.requestPermission();
        if (result === 'granted') {
          onToggle?.(true);
        } else {
          onBlocked?.();
        }
      } else if (permission === 'denied') {
        onBlocked?.();
      }
    } else {
      onToggle?.(false);
    }
  };
  return (
    <div className='w-full flex items-center justify-between mt-[24px] py-[12px]'>
      <span className=' body-16-eb leading-[22px] text-fg-gray-strong'>{label}</span>
      <Toggle isOn={isOn} onToggle={handleToggle} />
    </div>
  );
};

export default AlarmToggleItem;
