import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { exchangeKakaoToken } from '@/api/auth/kakaoAPI';

const KakaoCallback = () => {
  const [searchParams] = useSearchParams(); // URL 쿼리 파라미터 가져오기
  const navigate = useNavigate(); // 페이지 이동
  const code = searchParams.get('code'); // 로그인 성공 시 인가 코드
  const error = searchParams.get('error'); // 로그인 실패 시 에러 코드

  const getKakaoAccessToken = async (code: string): Promise<string> => {
    const res = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
        redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URL,
        code: code,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return res.data.access_token;
  };

  useEffect(() => {
    if (code) {
      const fetchKakaoLogin = async () => {
        try {
          // 1. access token 요청
          const KakaoAccessToken = await getKakaoAccessToken(code);
          console.log('카카오 access token:', KakaoAccessToken);

          // 2. 백엔드로부터 JWT, 유저정보, 신규 여부 받아오기
          const { jwt, user, isNewUser } = await exchangeKakaoToken(KakaoAccessToken);

          // 3. JWT 저장 및 페이지 이동
          localStorage.setItem('accessToken', jwt);
          navigate(isNewUser ? '/signup' : '/home');
        } catch (err) {
          console.error('카카오 로그인 처리 실패:', err);
          navigate('/login?error=kakao');
        }
      };

      fetchKakaoLogin();
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
