import { useState } from 'react';
import { requestFcmToken, messaging, onMessage } from '@/utils/firebaseMessaging';

const PwaTest = () => {
  const [permission, setPermission] = useState(Notification.permission);
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // 브라우저 권한 요청
  const askPermission = async () => {
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  // FCM 토큰 발급
  const getTokenHandler = async () => {
    const t = await requestFcmToken();
    if (t) setToken(t);
  };

  // 로컬 서비스워커로 직접 알림 띄우기
  const localNotify = async () => {
    if (permission !== 'granted') {
      alert('먼저 알림 권한을 허용해주세요.');
      return;
    }
    const registration = await navigator.serviceWorker.ready;
    registration.showNotification('로컬 테스트 알림 🎉', {
      body: '양치할 시간이에요!',
      icon: '/profileImage.png',
    });
  };

  // 포그라운드 메시지 수신 테스트 (브라우저 탭이 열려 있을 때)
  onMessage(messaging, (payload) => {
    setMessage(JSON.stringify(payload));
  });

  return (
    <div className='max-w-xl mx-auto p-6'>
      <h1 className='head-24-eb mb-4'>PWA / FCM 알림 테스트</h1>

      <p className='mb-2'>
        <strong>현재 권한:</strong> <span className='body-16-r'>{permission}</span>
      </p>

      <div className='flex flex-col space-y-2'>
        <button
          onClick={askPermission}
          className='px-4 py-2 rounded body-16-b bg-bg-tertiary-blue text-fg-accent-blue-strong'
        >
          1. 알림 권한 요청
        </button>

        <button
          onClick={getTokenHandler}
          className='px-4 py-2 rounded body-16-b bg-bg-primary-gray text-fg-primary'
        >
          2. FCM 토큰 발급
        </button>

        <button
          onClick={localNotify}
          className='px-4 py-2 rounded body-16-b bg-bg-tertiary-pink text-fg-accent-pink-strong'
        >
          3. 로컬 알림 띄우기
        </button>
      </div>

      {token && (
        <div className='mt-4'>
          <p className='body-16-eb'> 복사해서 Firebase 콘솔 테스트에 사용:</p>
          <textarea
            readOnly
            className='w-full mt-1 p-2 border rounded body-16-r'
            rows={3}
            value={token}
          />
        </div>
      )}

      {message && (
        <div className='mt-4'>
          <p className='body-16-eb'>📨 포그라운드 수신 메시지:</p>
          <pre className='bg-gray-100 p-2 rounded text-xs'>{message}</pre>
        </div>
      )}
    </div>
  );
};

export default PwaTest;
