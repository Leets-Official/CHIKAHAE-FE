import { getToken } from 'firebase/messaging';
import { messaging } from '@/utils/firebaseMessaging';
import { registerFcmToken } from '@/api/fcm/fcmTokenAPI';
import { isNotificationGranted } from '@/utils/notification';

export const registerFcmTokenIfPermitted = async ({
  requestPermission = false,
}: { requestPermission?: boolean } = {}) => {
  if (!isNotificationGranted()) {
    if (!requestPermission || (await Notification.requestPermission()) !== 'granted') {
      return;
    }
  }

  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    if (!token) return;

    const savedToken = localStorage.getItem('fcmToken');

    if (!savedToken || token !== savedToken) {
      await registerFcmToken(token);
      localStorage.setItem('fcmToken', token);
    }
  } catch (err) {
    console.error('FCM 토큰 발급 실패:', err);
  }
};
