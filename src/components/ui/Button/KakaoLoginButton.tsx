import { ModalSheet } from '../Modal';
import TermsList from '@/features/login/TermsList';
import Button from './Button';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useAgreementParams } from '@/hooks/useAgreementParams';
import { useEffect } from 'react';
import { exchangeKakaoToken } from '@/api/auth/kakaoAPI';

const KakaoLoginButton = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { agreements, isCompleted, toggleAgreement, reset, isModalOpen } = useAgreementParams();

  useEffect(() => {
    if (searchParams.get('needsAgreement') === 'true') {
      toggleAgreement(-1);
    }
  }, [searchParams, toggleAgreement]);

  const startKakaoLogin = () => {
    if (!isModalOpen) {
      window.location.href = KAKAO_AUTH_URL;
    }
  };

  const handleFinalSignup = async () => {
    if (!isCompleted) return;

    try {
      const { kakaoAccessToken } = location.state || {};
      if (!kakaoAccessToken) {
        throw new Error('카카오 액세스 토큰이 없습니다.');
      }
      localStorage.setItem('kakaoAccessToken', kakaoAccessToken);

      const { accessToken, refreshToken, nickname } = await exchangeKakaoToken();
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('nickname', nickname);

      // 회원가입 완료 후 홈으로 이동
      reset(); // 모달 상태 초기화
      navigate('/', { state: { isNewLogin: true } });
    } catch (err: any) {
      console.error('최종 회원가입 처리 실패:', err.message);
      reset();
      navigate('/login?error=signup_failed');
    }
  };

  return (
    <>
      <button
        onClick={startKakaoLogin}
        className='flex items-center justify-center bg-bg-primary-yellow h-12 rounded-lg w-full gap-2 cursor-pointer'
      >
        <img src='src/assets/icons/KaKaoSymbol.svg' alt='KakaoIcon' />
        <span className='body-16-eb'>카카오로 시작하기</span>
      </button>

      <ModalSheet isOpen={isModalOpen} onClose={reset}>
        <TermsList
          agreements={agreements}
          onToggle={toggleAgreement}
          onNavigate={navigate}
          searchParams={searchParams}
        />

        <div className='flex flex-row gap-2.5'>
          <Button
            variant='assistive'
            onClick={handleFinalSignup}
            disabled={!isCompleted}
            className={`flex-1 ${
              isCompleted
                ? 'bg-bg-primary-gray border-bg-primary-gray  text-fg-primary'
                : 'text-fg-secondary bg-fg-weak'
            } py-2 rounded-lg`}
          >
            14세 미만입니다
          </Button>
          <Button
            variant='primary'
            onClick={handleFinalSignup}
            disabled={!isCompleted}
            className={`flex-1 ${
              isCompleted ? 'bg-bg-primary-blue' : 'bg-fg-weak'
            } text-fg-secondary py-2 rounded-lg`}
          >
            14세 이상입니다
          </Button>
        </div>
      </ModalSheet>
    </>
  );
};

export default KakaoLoginButton;
