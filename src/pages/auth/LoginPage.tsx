import { ReactComponent as SignupBg } from '@/assets/images/signupBackground.svg';
import { ReactComponent as SignupSideLogo } from '@/assets/icons/signupSideLogo.svg';
import KakaoLoginButton from '@/components/ui/Button/KakaoLoginButton';
import { CHARACTER_MESSAGES } from '@/constants/characterMessages';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const prevStoredIndex = Number(sessionStorage.getItem('prevRandomIndex') ?? -1);
  const [randomIndex, setRandomIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  // 토큰 이용해서 로그인 여부 판단 -> login 페이지 이동 시 home으로 이동시킴
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * CHARACTER_MESSAGES.length);
    } while (newIndex === prevStoredIndex);

    setRandomIndex(newIndex);
    sessionStorage.setItem('prevRandomIndex', newIndex.toString());
  }, []);

  if (randomIndex === null) {
    return null;
  }
  const { main, sub, Svg } = CHARACTER_MESSAGES[randomIndex];

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <SignupBg className='absolute top-0 left-1/2 -translate-x-1/2 max-w-[480px] min-w-[360px] h-full z-0' />

      <div className='absolute top-0 left-1/2 -translate-x-1/2 max-w-[480px] min-w-[360px] h-full z-10'>
        <SignupSideLogo className='absolute top-7 right-5' />
      </div>

      <div className='absolute top-30 bottom-0 left-1/2 -translate-x-1/2 flex flex-col justify-between items-center w-full max-w-[480px] min-w-[360px] z-20 px-5 pb-5'>
        <div className='flex flex-col gap-3.25 items-center pt-5'>
          <p className='text-fg-accent-blue-weak text-[26px] font-extrabold leading-[30px] tracking-[-0.26px]'>
            {main}
          </p>
          <p className='text-[16px] font-bold tracking-[-0.16px] text-fg-strong leading-none'>
            <span className='block'>{sub}</span>
            <span className='block'></span>
          </p>
        </div>

        <div className='flex flex-col items-center'>
          <Svg />
        </div>
        <div className='flex flex-col items-center gap-y-4  max-w-[480px] min-w-[360px] px-5'>
          <KakaoLoginButton />
          <p className='flex flex-col items-center justify-center font-bold text-[10px] leading-[11px] tracking-[-0.1px] text-fg-medium'>
            <span>가입하면 CHIKAHAE의 </span>
            <span>이용약관 및 개인정보처리방침에 동의하게 됩니다.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
