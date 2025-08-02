import api from '../api';

// 슬롯 타입 enum 정의
export type SlotType = 'MORNING' | 'LUNCH' | 'EVENING';

// 개별 슬롯 정보
export interface AlarmSlot {
  slotType: SlotType;
  sendTime: string;
  enabled: boolean;
  title: string;
  message: string;
}

// 공통 응답 타입
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: {
    code: number;
    message: string;
    exceptionMessage: string;
  };
}

// 알림 슬롯 전체 조회
export const getAlarmSlots = async (): Promise<AlarmSlot[]> => {
  const res = await api.get<ApiResponse<AlarmSlot[]>>('/api/notifications/slots');
  console.log('알람 슬롯 조회 성공: ', res);
  return res.data.data;
};

// 슬롯별 시간 변경
export const updateSlotTime = async (slotType: SlotType, sendTime: string): Promise<void> => {
  await api.patch<ApiResponse<{}>>(`/api/notifications/slots/${slotType}/time`, {
    sendTime,
  });
};

// 슬롯별 활성화 토글 변경
export const updateSlotEnabled = async (slotType: SlotType, enabled: boolean): Promise<void> => {
  await api.patch<ApiResponse<{}>>(`/api/notifications/slots/${slotType}/enabled`, {
    enabled,
  });
};

// 전체 슬롯 활성화 상태 변경
export const updateAllSlotsEnabled = async (enabled: boolean): Promise<void> => {
  await api.patch<ApiResponse<{}>>('/api/notifications/slots/enabled', {
    enabled,
  });
};
