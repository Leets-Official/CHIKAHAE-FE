import Button from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { ReactComponent as LoginLogo } from '@/assets/icons/homeLogo.svg';
import KakaoLoginButton from '@/components/ui/Button/KakaoLoginButton';

const LoginPage = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center gap-y-28'>
        <LoginLogo />
        <KakaoLoginButton/>
      </div>

      <div
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[480px] min-w-[360px] px-4 py-2.5`}
      >
        <p className='flex flex-col items-center justify-center font-bold text-[10px] leading-[11px] tracking-[-0.1px]r text-fg-gray-weak'>
          <span>가입하면 CHIKAHE의 </span>
          <span>이용약관 및 개인정보처리방침에 동의하게 됩니다.</span>
        </p>
        
      </div>
    </>
  );
};

export default LoginPage;
