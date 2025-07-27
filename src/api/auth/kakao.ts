import api from '@/api/api';

export const exchangeKakaoToken = async (accessToken: string) => {
  const rest = await api.post('/auth/kakao', {
    accessToken,
  });
  console.log(rest);

  return rest.data;
};
