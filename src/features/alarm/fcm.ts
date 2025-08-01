import { getToken } from 'firebase/messaging';
import { messaging } from '@/utils/firebaseMessaging';
import { registerFcmToken } from '@/api/fcm/fcmAPI';

export const requestAndRegisterFcmToken = async () => {
  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    try {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });

      if (token) {
        await registerFcmToken(token);
        console.log('FCM 토큰 등록 성공');
      }
    } catch (err) {
      console.error('FCM 토큰 발급 실패:', err);
    }
  } else {
    console.log('알림 권한이 거부되었거나 대기 중입니다.');
  }
};
