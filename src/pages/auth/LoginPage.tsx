import SignupBg from '@/assets/images/signupBackground.svg';
import { ReactComponent as SignupSideLogo } from '@/assets/icons/signupSideLogo.svg';
import KakaoLoginButton from '@/components/ui/Button/KakaoLoginButton';
import { CHARACTER_MESSAGES } from '@/constants/characterMessages';
import { useEffect, useState } from 'react';
import RandomCharacterMessage from '@/features/login/RandomCharcterMessage';

const LoginPage = () => {
  const prevStoredIndex = Number(sessionStorage.getItem('prevRandomIndex') ?? -1);
  const [randomIndex, setRandomIndex] = useState<number | null>(null);

  // 랜덤 인덱스를 선택하여 중복 표시 방지
  useEffect(() => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * CHARACTER_MESSAGES.length);
    } while (newIndex === prevStoredIndex);

    setRandomIndex(newIndex);
    sessionStorage.setItem('prevRandomIndex', newIndex.toString());
  }, []);

  // 인덱스가 아직 설정되지 않았으면 null 반환
  if (randomIndex === null) {
    return null;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <img
        src={SignupBg}
        alt='Signup Background'
        className='absolute inset-0 w-full h-full object-cover'
      />

      <div className='absolute top-0 left-1/2 -translate-x-1/2 max-w-[480px] min-w-[360px] h-full z-10'>
        <SignupSideLogo className='absolute top-7 right-5' />
      </div>

      <div className='absolute top-30 bottom-0 left-1/2 -translate-x-1/2 flex flex-col justify-between items-center w-full max-w-[480px] min-w-[360px] z-20 px-5 pb-5'>
        <RandomCharacterMessage index={randomIndex} />

        <div className='flex flex-col items-center gap-y-4 max-w-[480px] min-w-[360px] px-5'>
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
