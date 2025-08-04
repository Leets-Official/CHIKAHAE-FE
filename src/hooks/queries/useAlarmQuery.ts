import { useQuery } from '@tanstack/react-query';
import { getAlarmSlots } from '@/api/myPage/alarmAPI';
import type { AlarmSlot } from '@/api/myPage/alarmAPI';

export const useAlarmSlots = () => {
  return useQuery<AlarmSlot[]>({
    queryKey: ['alarmSlots'],
    queryFn: getAlarmSlots,
  });
};
