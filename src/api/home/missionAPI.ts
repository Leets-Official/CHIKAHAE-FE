import api from '@/api/api';

export type MissionItem = {
  missionId: number;
  title: string;
  description: string;
  code: string;
  point: number;
  isCompleted: boolean;
};

export type MissionResponse = {
  success: boolean;
  data: MissionItem[];
  error?: {
    code: number;
    message: string;
    exceptionMessage?: string;
  };
};

// 오늘의 미션 조회
export const getTodayMissions = async (): Promise<MissionItem[]> => {
  const response = await api.get<MissionResponse>('/api/mission/today');

  if (!response.data.success) {
    throw new Error(response.data.error?.message || '미션 조회 실패');
  }

  return response.data.data;
};

// 미션 상태 변경
export const completeMission = async (
  missionCode: 'DAILY_QUIZ' | 'MORNING_ANIMATION' | 'LUNCH_ANIMATION' | 'EVENING_ANIMATION',
): Promise<number> => {
  try {
    const response = await api.post(`/api/mission/complete/${missionCode}`);

    if (!response.data.success) {
      throw new Error(response.data.error?.message || '미션 완료 처리 실패');
    }

    return response.data.data; // 포인트 반환
  } catch (error) {
    console.error(`[미션 완료] ${missionCode} 처리 실패:`, error);
    throw error;
  }
};
