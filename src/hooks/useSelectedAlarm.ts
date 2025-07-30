import { useState } from 'react';
import type { AlarmSlot } from '@/api/myPage/alarmAPI';

type SelectedAlarm = AlarmSlot & {
  hour: string;
  minute: string;
  period: 'AM' | 'PM';
};

export const useSelectedAlarm = () => {
  const [selectedAlarm, setSelectedAlarm] = useState<SelectedAlarm | null>(null);

  // ex. 15:00 -> 03:00:PM 으로 표시
  const parseTime = (hourNum: number, minute: number) => {
    const period: 'AM' | 'PM' = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    return {
      hour: String(hour12).padStart(2, '0'),
      minute: String(minute).padStart(2, '0'),
      period,
    };
  };

  const selectAlarm = (alarm: AlarmSlot) => {
    const { hour, minute, period } = parseTime(alarm.sendTime.hour, alarm.sendTime.minute);

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
