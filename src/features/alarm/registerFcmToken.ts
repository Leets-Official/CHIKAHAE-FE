import { getToken } from 'firebase/messaging';
import { messaging } from '@/utils/firebaseMessaging';
import { registerFcmToken } from '@/api/fcm/fcmTokenAPI';

export const registerFcmTokenIfPermitted = async ({
  requestPermission = false,
}: { requestPermission?: boolean } = {}) => {
  let permission = Notification.permission;

  // 권한 요청이 필요한 경우
  if (permission !== 'granted') {
    if (requestPermission) {
      const newPermission = (await Notification.requestPermission()) as NotificationPermission;
      if (newPermission !== 'granted') {
        console.log('[FCM] 알림 권한이 거부되었거나 대기 중입니다.');
        return;
      }
      permission = newPermission;
    } else {
      console.log('[FCM] 알림 권한 없음. 요청도 하지 않음');
      return;
    }
  }

  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    if (!token) {
      console.warn('[FCM] 토큰을 발급받지 못했습니다.');
      return;
    }

    const savedToken = localStorage.getItem('fcmToken');

    if (savedToken === null || token !== savedToken) {
      await registerFcmToken(token);
      localStorage.setItem('fcmToken', token);
      console.log('[FCM] 토큰 등록 완료 및 저장됨');
    } else {
      console.log('[FCM] 이미 등록된 토큰. 재등록 생략');
    }
  } catch (err) {
    console.error('[FCM] 토큰 발급 실패:', err);
  }
};
