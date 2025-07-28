import api from '@/api/api';

export interface SignupPayload {
  kakaoAccessToken: string;
  nickname: string;
  birth: string;
  gender: boolean | undefined;
  profileImage?: string;
  parentName?: string;
  parentGender?: boolean;
  parentBirth?: string;
}

export const signupUser = async (data: SignupPayload) => {
  const res = await api.post('/api/signup', data);
  return res.data;
};
