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

// 토큰 재발급 함수
export const reissueToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('저장된 refreshToken이 없습니다.');

  try {
    localStorage.removeItem('accessToken');

    const res = await api.post(
      '/auth/reissue',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );

    const {
      access_token,
      refresh_token,
    }: {
      access_token: string;
      refresh_token: string;
    } = res.data;

    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('refreshToken', refresh_token);

    return { accessToken: access_token, refreshToken: refresh_token };
  } catch (error) {
    console.error('토큰 재발급 실패:', error);
    throw error;
  }
};

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // JWT 만료나 인증 실패 등의 응답 처리
    const originalRequest = error.config;
    const message = error?.response?.data?.message || '';

    const isTokenExpired =
      error.response?.status === 401 && message.includes('JWT expired') && !originalRequest._retry;

    if (isTokenExpired) {
      try {
        originalRequest._retry = true; // 무한 루프 방지
        const newAccessToken = await reissueToken();

        // 새로운 accessToken으로 헤더 수정 후 재요청
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('토큰 재발급 실패:', refreshError);
        localStorage.clear();
        window.location.href = '/'; // 로그인 페이지로 이동
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
