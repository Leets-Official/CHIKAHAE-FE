import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';

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
    // 현재 디바이스의 FCM 토큰 요청
    const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (currentToken) {
      console.log('FCM Token:', currentToken);
      //TODO: 여기에 서버로 토큰 전송하는 로직 추가
      return currentToken;
    } else {
      console.log('No registration token available.');
    }
  } catch (error) {
    console.error('An error occurred while retrieving token. ', error);
  }
}

export { messaging, onMessage, getToken, requestFcmToken };
