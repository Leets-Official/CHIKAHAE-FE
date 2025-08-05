import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { requestKakaoCallback, exchangeKakaoToken } from '@/api/auth/kakaoAPI';

const KakaoCallback = () => {
  const [searchParams] = useSearchParams(); // URL 쿼리 파라미터 가져오기
  const navigate = useNavigate(); // 페이지 이동
  const code = searchParams.get('code'); // 로그인 성공 시 인가 코드
  const error = searchParams.get('error'); // 로그인 실패 시 에러 코드

  useEffect(() => {
    const handleKakaoLogin = async () => {
      try {
        if (!code) {
          console.error('인가 코드 누락');
          navigate('/login?error=kakao');
          return;
        }

        const {
          accessToken: kakaoAccessToken,
          refreshToken: kakaoRefreshToken,
          memberId,
          nickname,
        } = await requestKakaoCallback(code);

        localStorage.setItem('kakaoAccessToken', kakaoAccessToken);
        localStorage.setItem('kakaoRefreshToken', kakaoRefreshToken);

        // 1. 회원가입이 필요한 유저
        if (!memberId) {
          navigate('/signup?needsAgreement=true', {
            state: {
              kakaoAccessToken,
              kakaoRefreshToken,
              nickname,
            },
          });
          return;
        }

        // 2. 회원가입이 이미 되어 있으면 -> kakaoAccessToken으로 서버 토큰 교환
        const { accessToken, refreshToken, nickname: finalNickname } = await exchangeKakaoToken();

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('nickname', finalNickname);
        localStorage.removeItem('kakaoAccessToken');
        localStorage.removeItem('kakaoRefreshToken');

        navigate('/', { state: { isNewLogin: true } });
      } catch (err: any) {
        console.error('카카오 로그인 처리 실패:', err.message);
        navigate('/login?error=kakao');
      }
    };

    if (error) {
      console.error('카카오 로그인 실패:', error);
      navigate('/login?error=kakao');
      return;
    }

    handleKakaoLogin();
  }, [code, error, navigate]);

  return (
    <div className='text-center p-10'>
      <p className='text-lg'>카카오 로그인 처리 중..</p>
    </div>
  );
};

export default KakaoCallback;
