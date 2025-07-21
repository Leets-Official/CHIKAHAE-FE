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

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// getToken 호출 시 vapidKey 옵션 넘겨주기
async function requestFcmToken() {
  try {
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
