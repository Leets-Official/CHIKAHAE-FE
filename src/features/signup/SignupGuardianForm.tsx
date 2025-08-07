import { useState } from 'react';
import { validateName } from '@/utils/validateUserInfo';
import { isFutureDate } from '@/utils/date';
import Button from '@/components/ui/Button';
import UserInfoForm from '@/components/ui/UserInfoForm';
import SignupBg from '@/assets/images/signupBackground.svg';

interface Props {
  name: string;
  setName: (name: string) => void;
  gender: string;
  setGender: (gender: string) => void;
  birthDate: string;
  setBirthDate: (birth: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  onNext: () => void;
}

const SignupGuardianForm = ({
  name,
  setName,
  gender,
  setGender,
  birthDate,
  setBirthDate,
  phoneNumber,
  setPhoneNumber,
  onNext,
}: Props) => {
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (value: string) => {
    setName(value);
    const result = validateName(value);
    setError(result);
  };

  const handleBirthDateChange = (value: string) => {
    setBirthDate(value);
    if (isFutureDate(value)) {
      setError('생년월일은 오늘 이전 날짜로 입력해 주세요.');
    } else {
      setError(null);
    }
  };

  const isFormIncomplete =
    !gender || !birthDate || !name || phoneNumber.replace(/\D/g, '').length !== 11 || !!error;

  return (
    <div className='flex flex-col items-center min-h-screen w-full'>
      <img
        src={SignupBg}
        alt='Signup Background'
        className='absolute inset-0 w-full h-full object-cover mx-auto'
      />
      <div className='flex flex-col justify-between w-full pt-11 px-[20px]'>
        <div className='flex flex-col gap-y-10 mt-10 w-full max-w-[480px] mx-auto z-10'>
          <div className='text-left'>
            <p className='text-fg-primary text-[22px] font-extrabold leading-[25px] tracking-[-0.22px] mb-2.5'>
              보호자 정보를 입력해주세요
            </p>
            <p className='text-fg-primary text-[14px] font-normal leading-[16px] tracking-[-0.14px]'>
              치카해에서 사용할 보호자 정보를 입력해주세요
            </p>
          </div>

          <div className='flex flex-col items-center gap-y-[30px]'>
            <div className='w-full'>
              <UserInfoForm
                type='full'
                name={name}
                onNameChange={handleNameChange}
                gender={gender}
                onGenderChange={setGender}
                birthDate={birthDate}
                onBirthDateChange={handleBirthDateChange}
                phoneNumber={phoneNumber}
                onPhoneNumberChange={setPhoneNumber}
              />

              {error && (
                <p className='text-fg-system-error body-12-r h-[14px] text-left flex px-4 flex-col items-start mt-[10px]'>
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className='absolute bottom-0 left-1/2 -translate-x-1/2 max-w-[480px] min-w-[360px] w-full px-[20px] py-5.75 z-10'>
          <Button
            variant='primary'
            onClick={onNext}
            size='large'
            fullWidth={true}
            disabled={isFormIncomplete}
          >
            완료
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupGuardianForm;
