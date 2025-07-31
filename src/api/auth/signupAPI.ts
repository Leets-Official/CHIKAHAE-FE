import api from '@/api/api';

interface SignupResponse {
  success: boolean;
  data: {
    nickname: string;
    accessToken: string;
    refreshToken: string;
  };
  error?: {
    code: number;
    message: string;
    exceptionMessage: string;
  };
}

export interface SignupPayload {
  kakaoAccessToken: string;
  nickname: string;
  birth: string;
  gender: string;
  parentName?: string;
  parentGender?: string;
  parentBirth?: string;
  parentPhoneNumber?: string;
}

export const signupUser = async (data: SignupPayload): Promise<SignupResponse> => {
  try {
    const response = await api.post('/api/signup/kakao', data);
    const { nickname, accessToken, refreshToken } = response.data.data;

    localStorage.setItem('nickname', nickname);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    console.log('회원가입성공:', response);
    return response.data;
  } catch (err) {
    console.error('회원가입 API 에러:', err);
    throw err;
  }
};
