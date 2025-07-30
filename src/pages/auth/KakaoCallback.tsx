import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getKakaoAccessToken, exchangeKakaoToken } from '@/api/auth/kakaoAPI';

const KakaoCallback = () => {
  const [searchParams] = useSearchParams(); // URL 쿼리 파라미터 가져오기
  const navigate = useNavigate(); // 페이지 이동
  const code = searchParams.get('code'); // 로그인 성공 시 인가 코드
  const error = searchParams.get('error'); // 로그인 실패 시 에러 코드

  useEffect(() => {
    if (code) {
      const handleLogin = async () => {
        try {
          // 1. access token 요청
          const kakaoAccessToken = await getKakaoAccessToken(code);
          const { accessToken, refreshToken, nickname, memberId } =
            await exchangeKakaoToken(kakaoAccessToken);

          // 3. JWT 저장 및 페이지 이동
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('nickname', nickname);
          localStorage.setItem('memberId', memberId);
          navigate('/signup');
        } catch (err) {
          console.error('카카오 로그인 처리 실패:', err);
          navigate('/login?error=kakao');
        }
      };

      handleLogin();
    }

    if (error) {
      console.error('로그인 실패:', error);
      navigate('/login?error=kakao');
    }
  }, [code, error, navigate]);

  return (
    <div className='text-center p-10'>
      <p className='text-lg'>카카오 로그인 처리 중..</p>
    </div>
  );
};

export default KakaoCallback;
