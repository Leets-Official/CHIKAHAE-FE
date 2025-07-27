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
  error: {
    code: number;
    message: string;
    exceptionMessage?: string;
  };
};

// 오늘의 미션 조회
export const getTodayMissions = async (): Promise<MissionItem[]> => {
  const response = await api.get<MissionResponse>('/api/mission/today');

  if (!response.data.success) {
    throw new Error(response.data.error.message || '미션 조회 실패');
  }

  return response.data.data;
};
