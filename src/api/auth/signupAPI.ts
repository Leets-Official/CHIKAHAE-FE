import api from '@/api/api';

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

export const signupUser = async (data: SignupPayload) => {
  const res = await api.post('/api/signup', data);
  return res.data;
};
