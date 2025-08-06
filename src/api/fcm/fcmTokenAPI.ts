import api from '@/api/api';

// FCM 토큰 등록
export const registerFcmToken = async (fcmToken: string) => {
  const response = await api.post('/api/users/fcm-tokens', { fcmToken });
  return response.data;
};

// FCM 토큰 조회
export const fetchFcmTokens = async () => {
  const response = await api.get('/api/users/fcm-tokens');
  return response.data;
};

// FCM 토큰 삭제
export const deleteFcmToken = async (token: string) => {
  const response = await api.delete(`/api/users/fcm-tokens/${token}`);
  return response.data;
};
