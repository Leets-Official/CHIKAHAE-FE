import { ReactComponent as KakaoLogin } from '@/assets/icons/loginIcon.svg';

const KakaoLoginButton = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URL = 'http://localhost:3000/auth/kakao/callback';

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button onClick={handleLogin} className='flex items-center justify-center w-full'>
      <KakaoLogin />
    </button>
  );
};

export default KakaoLoginButton;
