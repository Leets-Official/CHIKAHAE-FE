// FIXME: 임시 (auth로 옮길 예정)

import api from '../api';

export const logout = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('저장된 refreshToken이 없습니다.');

  try {
    await api.post('/api/signup/logout', { refreshToken });
    localStorage.clear(); // 토큰 및 기타 사용자 정보 제거
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw error;
  }
};

export const withdraw = async () => {
  try {
    await api.delete('/api/signup/withdraw');
    localStorage.clear(); // 탈퇴 후 토큰 제거
  } catch (error) {
    console.error('회원 탈퇴 실패:', error);
    throw error;
  }
};
