import api from '../api';

// 로그아웃 요청
export const logout = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('저장된 refreshToken이 없습니다.');

  try {
    await api.delete('/api/signup/logout', {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    localStorage.clear(); // 토큰 및 기타 사용자 정보 제거
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw error;
  }
};

// 회원 탈퇴 요청
export const withdraw = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('저장된 refreshToken이 없습니다.');

    await api.post('/api/signup/withdraw', { refreshToken });

    localStorage.clear(); // 토큰 및 기타 사용자 정보 제거
  } catch (error) {
    console.error('회원 탈퇴 실패:', error);
    throw error;
  }
};
