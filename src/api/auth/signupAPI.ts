import api from '@/api/api';

interface SignupResponse {
  success: boolean;
  message?: string;
  userId?: string;
}

export interface SignupPayload {
  kakaoAccessToken: string;
  nickname: string;
  birth: string;
  gender: string;
  profileImage?: string;
  parentName?: string;
  parentGender?: string;
  parentBirth?: string;
}

export const signupUser = async (data: SignupPayload): Promise<SignupResponse> => {
  try {
    const res = await api.post('/api/signup', data);
    return res.data;
  } catch (err) {
    console.error('회원가입 API 에러:', err);
    throw err; // 호출부에서 재처리할 수 있게 re-throw
  }
};
