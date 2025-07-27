import api from '@/api/api';

// 포인트 이력 아이템 타입
export type PointHistoryItem = {
  amount: number;
  type: 'EARN' | 'CONSUME';
  description: string;
  createdAt: string;
};

// 포인트 적립/소비 응답 타입
export type PointActionResponse = {
  amount: number;
  description: string;
};

// 포인트 잔액 조회 응답 타입
export type PointBalance = number;

// 포인트 잔액 조회
export const getPointBalance = async (): Promise<PointBalance> => {
  const response = await api.get('/api/points/balance');
  return response.data;
};

// 포인트 이력 조회
export const getPointHistory = async (): Promise<PointHistoryItem[]> => {
  const response = await api.get('/api/points/history');
  return response.data;
};

// 포인트 적립
export const earnPoints = async (amount: number): Promise<PointActionResponse> => {
  const response = await api.post('/api/points/earn', { amount });
  return response.data;
};

// 포인트 소비
export const consumePoints = async (amount: number): Promise<PointActionResponse> => {
  const response = await api.post('/api/points/consume', { amount });
  return response.data;
};
