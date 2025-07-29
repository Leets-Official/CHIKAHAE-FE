import { useQuery } from '@tanstack/react-query';
import { getTodayMissions } from '@/api/home/missionAPI';
import type { BrushingCardConfig } from '@/types/brushing';

export const useTodayMissions = () => {
  return useQuery({
    queryKey: ['todayMissions'],
    queryFn: async (): Promise<BrushingCardConfig[]> => {
      const data = await getTodayMissions();

      return data.map((mission) => ({
        id: mission.code,
        title: mission.title,
        description: mission.description,
        buttonText: mission.code === 'DAILY_QUIZ' ? '퀴즈 도전 하기' : '양치하러 가기',
        route: mission.code === 'DAILY_QUIZ' ? '/quiz/start' : '/brush/start',
        isCompleted: mission.isCompleted,
      }));
    },
    staleTime: 1000 * 60, // 1분 정도 캐시 유효
  });
};
