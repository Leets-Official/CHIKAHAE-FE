import api from '@/api/api';
import axios from 'axios';

export const getKakaoAccessToken = async (code: string): Promise<string> => {
  const res = await axios.post(
    'https://kauth.kakao.com/oauth/token',
    new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
      redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URL,
      code: code,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  return res.data.access_token;
};

export const exchangeKakaoToken = async (accessToken: string) => {
  const res = await api.post('/api/login/kakao', {
    accessToken,
  });
  if (!res.data.success) {
    const errorMsg =
      res.data.error?.exceptionMessage || res.data.error?.message || '카카오 로그인 실패';
    throw new Error(errorMsg);
  }

  return res.data.data;
};
