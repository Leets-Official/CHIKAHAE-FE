import { deleteFcmToken } from '@/api/fcm/fcmTokenAPI';

export const clearFcmToken = async () => {
  const token = localStorage.getItem('fcmToken');
  if (!token) return;

  try {
    await deleteFcmToken(token);
    localStorage.removeItem('fcmToken');
    console.log('FCM 토큰 삭제 완료');
  } catch (err) {
    console.error('FCM 토큰 삭제 실패:', err);
  }
};
