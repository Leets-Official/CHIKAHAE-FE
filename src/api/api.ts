import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // JWT 만료나 인증 실패 등의 응답 처리
    const message = error?.response?.data?.message || '';

    const isTokenExpired =
      (error.response?.status === 401 || error.response?.status === 500) &&
      message.includes('JWT expired');

    if (isTokenExpired) {
      console.warn('만료된 토큰입니다.');
      localStorage.clear();
      window.location.href = '/'; // 홈 또는 로그인 페이지로 이동
    }

    return Promise.reject(error);
  },
);

export default api;
