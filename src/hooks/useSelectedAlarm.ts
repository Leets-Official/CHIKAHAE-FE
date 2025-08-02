import { useState } from 'react';
import type { AlarmSlot } from '@/api/myPage/alarmAPI';

type SelectedAlarm = AlarmSlot & {
  hour: string;
  minute: string;
  period: 'AM' | 'PM';
};

export const useSelectedAlarm = () => {
  const [selectedAlarm, setSelectedAlarm] = useState<SelectedAlarm | null>(null);

  // 'HH:mm' → { hour: '03', minute: '30', period: 'PM' }
  const parseTime = (sendTime: string) => {
    const [hourStr, minuteStr] = sendTime.split(':');
    const hour24 = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    const period: 'AM' | 'PM' = hour24 >= 12 ? 'PM' : 'AM';
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

    return {
      hour: String(hour12).padStart(2, '0'),
      minute: String(minute).padStart(2, '0'),
      period,
    };
  };

  const selectAlarm = (alarm: AlarmSlot) => {
    const { hour, minute, period } = parseTime(alarm.sendTime);

    setSelectedAlarm({
      ...alarm,
      hour,
      minute,
      period,
    });
  };

  const reset = () => setSelectedAlarm(null);

  return {
    selectedAlarm,
    selectAlarm,
    reset,
  };
};
