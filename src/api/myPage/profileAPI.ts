import api from '../api';

// 프로필 정보 타입
export interface UserProfile {
  profileImage: string;
  nickname: string;
  name: string;
  kakaoEmail: string;
  gender: string;
  birth: string; // ISO 날짜 문자열
}

// 공통 응답 타입
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: {
    code: number;
    message: string;
    exceptionMessage: string;
  };
}

// 프로필 조회
export const fetchUserProfile = async (): Promise<UserProfile> => {
  const res = await api.get<ApiResponse<UserProfile>>('/api/mypage/profile');
  return res.data.data;
};

// 프로필 수정
export const updateUserProfile = async (payload: {
  nickname: string;
  profileImage: string;
}): Promise<void> => {
  const res = await api.post<ApiResponse<null>>('/api/mypage/profile', payload);
  if (!res.data.success) {
    throw new Error(res.data.error.message || '프로필 수정 실패');
  }
};
