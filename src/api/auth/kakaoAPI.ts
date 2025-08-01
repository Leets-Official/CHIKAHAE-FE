import api from '@/api/api';
import axios from 'axios';

// 카카오 토큰 응답 타입 정의
type KakaoTokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_token_expires_in: number;
  token_type: string;
  scope?: string;
};

// 백엔드에서 리턴하는 사용자 정보 타입 정의
type KakaoCallbackResponse = {
  accessToken: string;
  refreshToken: string;
  nickname: string;
  memberId: string;
};

/**
 * 카카오 인가 코드를 사용해 access token, refresh token 요청
 * @param code - 카카오 로그인 후 리다이렉트로 받은 인가 코드
 */
export const getKakaoAccessToken = async (code: string): Promise<KakaoTokenResponse> => {
  const response = await axios.post(
    'https://kauth.kakao.com/oauth/token',
    new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
      redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
      code,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return response.data;
};

/**
 * 프론트에서 받은 인가 코드를 백엔드에 전달해 사용자 정보 획득
 * @param code - 카카오 로그인 후 받은 인가 코드
 */
export const requestKakaoCallback = async (code: string): Promise<KakaoCallbackResponse> => {
  // 백엔드로 인가 코드 전달
  const response = await api.get('/login/kakao/callback', {
    params: { code },
  });

  if (!response.data.success) {
    const errorMsg =
      response.data.error?.exceptionMessage || response.data.error?.message || '카카오 로그인 실패';
    throw new Error(errorMsg);
  }

  console.log('카카오 인가 코드 전달:', response);
  return response.data.data;
};

/**
 * localStorage에 저장된 kakao accessToken을 백엔드에 전달하여 최종 로그인 처리
 */
export const exchangeKakaoToken = async () => {
  const kakaoAccessToken = localStorage.getItem('kakaoAccessToken');

  if (!kakaoAccessToken) {
    throw new Error('카카오 accessToken이 존재하지 않습니다.');
  }

  const response = await api.post('/api/login/kakao', {
    accessToken: kakaoAccessToken,
  });

  if (!response.data.success) {
    const errorMsg =
      response.data.error?.exceptionMessage || response.data.error?.message || '카카오 로그인 실패';
    throw new Error(errorMsg);
  }

  return response.data.data;
};
