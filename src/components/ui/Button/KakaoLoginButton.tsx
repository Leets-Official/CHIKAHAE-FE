import { useState } from 'react';
import { ModalSheet } from '../Modal';
import { ReactComponent as Check } from '@/assets/icons/check.svg';
import { ReactComponent as ChevronRight } from '@/assets/icons/chevron_right.svg';
import Button from './Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TERMS } from '@/constants/terms';
import type { TermType } from '@/constants/terms';

const KakaoLoginButton = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URL = import.meta.env.VITE_KAKAO_REDIRECT_URL;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const isModalOpen = searchParams.get('showTermsModal') === 'true';

  const initialAgreements = (() => {
    const agreementsParam = searchParams.get('agreements');
    if (agreementsParam) {
      return agreementsParam.split(',').map((item) => item === 'true');
    }
    return [false, false, false];
  })();
  const [agreements, setAgreements] = useState<boolean[]>(initialAgreements);

  const isCompleted = agreements[0] && agreements[1];

  const updateUrlSearchParams = (showModal: boolean, currentAgreements: boolean[]) => {
    const newSearchParams = new URLSearchParams();
    if (showModal) {
      newSearchParams.set('showTermsModal', 'true');
    }
    newSearchParams.set('agreements', currentAgreements.join(','));
    setSearchParams(newSearchParams);
  };

  const handleOpenModal = () => {
    updateUrlSearchParams(true, agreements);
  };

  const handleCloseModal = () => {
    setSearchParams(new URLSearchParams());
    setAgreements([false, false, false]);
  };

  const handleLogin = () => {
    if (isCompleted) {
      handleCloseModal();
      window.location.href = KAKAO_AUTH_URL;
    }
  };

  const toggleAgreement = (index: number) => {
    setAgreements((prev) => {
      const newAgreements = prev.map((checked, i) => (i === index ? !checked : checked));

      updateUrlSearchParams(true, newAgreements);
      return newAgreements;
    });
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className='flex items-center justify-center bg-bg-primary-yellow h-12 rounded-lg w-full gap-2 cursor-pointer'
      >
        <img src='src/assets/icons/KaKaoSymbol.svg' alt='KakaoIcon' />
        카카오로 시작하기
      </button>

      <ModalSheet isOpen={isModalOpen} onClose={handleCloseModal}>
        <ul className='space-y-2 mb-6'>
          {Object.entries(TERMS).map(([key, { message }], idx) => {
            const termKey = key as TermType;
            return (
              <div key={termKey} className='cursor-pointer'>
                <div className='flex flex-row justify-between'>
                  <div className='flex flex-row gap-2.5' onClick={() => toggleAgreement(idx)}>
                    <Check
                      className={`w-6 h-6 ${
                        agreements[idx] ? 'text-fg-accent-blue-weak' : 'text-fg-medium'
                      }`}
                    />
                    <li
                      className={`flex items-center text-[12px] font-bold leading-[14px] tracking-[-0.12px] ${
                        agreements[idx] ? 'text-fg-primary' : 'text-fg-medium'
                      }`}
                    >
                      {message}
                    </li>
                  </div>
                  <ChevronRight
                    onClick={(e) => {
                      e.stopPropagation();

                      navigate(
                        `/terms/${['required-terms', 'required-privacy', 'optional-privacy'][idx]}?${searchParams.toString()}`,
                      );
                    }}
                    className={`w-6 h-6 ${agreements[idx] ? 'text-fg-primary' : 'text-fg-medium'}`}
                  />
                </div>
              </div>
            );
          })}
        </ul>

        <div className='flex flex-row gap-2.5'>
          <Button
            variant='assistive'
            onClick={handleLogin}
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
            onClick={handleLogin}
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
