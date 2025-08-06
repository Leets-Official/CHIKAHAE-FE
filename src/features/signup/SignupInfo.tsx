import Button from '@/components/ui/Button';
import UserInfoForm from '@/components/ui/UserInfoForm';
import SignupBg from '@/assets/images/signupBackground.svg';
import { useState } from 'react';
import { isOver14, isFutureDate } from '@/utils/date';

interface SignupInfoProps {
  gender: string;
  setGender: (gender: string) => void;
  birthDate: string;
  setBirthDate: (birthDate: string) => void;
  onNext: (nextStep: 'complete' | 'guardianIntro') => void;
}

const SignupInfo = ({ gender, setGender, birthDate, setBirthDate, onNext }: SignupInfoProps) => {
  const [error, setError] = useState<string | null>(null);

  const isFormIncomplete = !gender || !birthDate || !!error;

  // 생년월일 변경 시 에러 검사
  const handleBirthDateChange = (date: string) => {
    setBirthDate(date);
    if (isFutureDate(date)) {
      setError('생년월일은 오늘 이전 날짜로 입력해 주세요.');
    } else {
      setError(null);
    }
  };

  const handleNext = () => {
    const nextStep = isOver14(birthDate) ? 'complete' : 'guardianIntro';
    onNext(nextStep);
  };

  return (
    <div className='flex flex-col items-center min-h-screen w-full max-w-[480px]'>
      <img
        src={SignupBg}
        alt='Signup Background'
        className='absolute inset-0 w-full h-full object-cover mx-auto'
      />

      <div className='flex flex-col justify-between w-full pt-11 px-[20px]'>
        <div className='flex flex-col gap-y-10 mt-10 w-full max-w-[480px] mx-auto z-10'>
          <div className='text-left'>
            <p className='text-fg-primary text-[22px] font-extrabold leading-[25px] tracking-[-0.22px] mb-2.5'>
              필수 정보를 입력해주세요
            </p>
            <p className='text-fg-primary text-[14px] font-normal leading-[16px] tracking-[-0.14px]'>
              치카해에서 사용할 필수 정보를 입력해주세요
            </p>
          </div>

          <div className='flex flex-col items-center gap-y-[30px]'>
            <div className='w-full cursor-pointer'>
              <UserInfoForm
                type='partial'
                gender={gender}
                onGenderChange={setGender}
                birthDate={birthDate}
                onBirthDateChange={handleBirthDateChange}
              />
              {error && (
                <p className='text-fg-system-error body-12-r h-[14px] text-left flex px-4 flex-col items-start mt-[10px]'>
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='fixed bottom-0 left-1/2 -translate-x-1/2 max-w-[480px] min-w-[360px] w-full px-[20px] py-5.75 z-10'>
        <Button
          variant='primary'
          onClick={handleNext}
          size='large'
          fullWidth
          disabled={isFormIncomplete}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default SignupInfo;
