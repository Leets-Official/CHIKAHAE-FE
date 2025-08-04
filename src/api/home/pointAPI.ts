import api from '@/api/api';
import { logApiError } from '@/utils/logApiError';

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
  try {
    const response = await api.get('/api/points/balance');
    return response.data;
  } catch (error) {
    logApiError(error, '포인트 잔액 조회');
    throw error;
  }
};

// 포인트 이력 조회
export const getPointHistory = async (): Promise<PointHistoryItem[]> => {
  try {
    const response = await api.get('/api/points/history');
    return response.data;
  } catch (error) {
    logApiError(error, '포인트 이력 조회');
    throw error;
  }
};

// 포인트 적립
export const earnPoints = async (amount: number): Promise<PointActionResponse> => {
  try {
    const response = await api.post('/api/points/earn', { amount });
    return response.data;
  } catch (error) {
    logApiError(error, '포인트 적립');
    throw error;
  }
};

// 포인트 소비
export const consumePoints = async (amount: number): Promise<PointActionResponse> => {
  try {
    const response = await api.post('/api/points/consume', { amount });
    return response.data;
  } catch (error) {
    logApiError(error, '포인트 소비');
    throw error;
  }
};
