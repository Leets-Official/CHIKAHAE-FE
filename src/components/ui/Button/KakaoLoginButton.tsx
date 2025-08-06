import { ModalSheet } from '../Modal';
import TermsList from '@/features/login/TermsList';
import Button from './Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAgreementParams } from '@/hooks/useAgreementParams';
import { useEffect } from 'react';
import { ReactComponent as KakaoIcon } from '@/assets/icons/KaKaoSymbol.svg';

const KakaoLoginButton = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { agreements, isCompleted, toggleAgreement, reset, isModalOpen } = useAgreementParams();

  useEffect(() => {
    if (searchParams.get('needsAgreement') === 'true') {
      toggleAgreement(-1);
    }
  }, [searchParams, toggleAgreement]);

  const startKakaoLogin = () => {
    if (!isModalOpen) {
      window.location.href = KAKAO_AUTH_URI;
    }
  };

  const handleSignup = async () => {
    if (!isCompleted) return;
    navigate('/signup');
  };

  return (
    <>
      <button
        onClick={startKakaoLogin}
        className='flex items-center justify-center bg-bg-primary-yellow h-12 rounded-lg w-full gap-2 cursor-pointer'
      >
        <KakaoIcon /> <span className='body-16-eb'>카카오로 시작하기</span>
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
            onClick={handleSignup}
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
            onClick={handleSignup}
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
