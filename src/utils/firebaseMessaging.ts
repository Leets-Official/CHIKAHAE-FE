import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import { registerFcmToken } from '@/api/fcm/fcmTokenAPI';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// FCM 메시징 객체 가져오기
const messaging = getMessaging(app);

/**
 * 브라우저 알림 권한을 요청하고, FCM 토큰을 받아옴
 * 받은 토큰은 이후 서버에 저장해 사용자에게 알림 전송에 사용
 */
async function requestFcmToken() {
  try {
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js'); // 💥 직접 등록해줌
    console.log('[FCM] ServiceWorker 등록 완료:', registration);

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('[FCM] 알림 권한 거부됨');
      return;
    }

    const currentToken = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (currentToken) {
      console.log('[FCM] 토큰:', currentToken);
      await registerFcmToken(currentToken);
      return currentToken;
    } else {
      console.warn('[FCM] 토큰이 존재하지 않음');
    }
  } catch (error) {
    console.error('[FCM] 토큰 요청 중 오류:', error);
  }
}

export { messaging, onMessage, getToken, requestFcmToken };
