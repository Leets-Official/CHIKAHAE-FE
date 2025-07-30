import Button from '@/components/ui/Button';
import UserInfoForm from '@/components/ui/UserInfoForm';
import { ReactComponent as SignupBg } from '@/assets/images/signupBackground.svg';
import { useState } from 'react';

interface Props {
  onNext: () => void;
}

const SignupGuardianForm = ({ onNext }: Props) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const isFormIncomplete =
    !gender || !birthDate || !name || phoneNumber.replace(/\D/g, '').length !== 11;

  return (
    <div className='flex flex-col items-center min-h-screen w-full '>
      <SignupBg className='absolute top-0 left-1/2 -translate-x-1/2 max-w-[480px] min-w-[360px] h-full z-0' />
      <div
        className='
      flex flex-col 
      min-h-screen justify-between z
      pt-11
      '
      >
        <div
          className='
        flex               
        flex-col         
        gap-y-10           
        px-5         
        mt-10
        w-full
        max-w-[480px]
        min-w-[360px]
        mx-auto           
        z-10
      '
        >
          <div className='w-full text-left'>
            <p
              className='
              text-fg-primary
              text-[22px]
              font-extrabold
              leading-[25px]
              tracking-[-0.22px]
              self-stretch
              mb-2.5 
            '
            >
              보호자 정보를 입력해주세요
            </p>

            <p
              className='
              text-fg-primary
              text-[14px]
              font-normal
              leading-[16px]
              tracking-[-0.14px]
              items-stretch
            '
            >
              치카해에서 사용할 보호자 정보를 입력해주세요
            </p>
          </div>

          <div
            className='
          flex              
          flex-col       
          items-center    
          gap-y-[30px]     
        '
          >
            <div className='w-full'>
              <UserInfoForm
                type='full'
                name={name}
                onNameChange={setName}
                gender={gender}
                onGenderChange={setGender}
                birthDate={birthDate}
                onBirthDateChange={setBirthDate}
                phoneNumber={phoneNumber}
                onPhoneNumberChange={setPhoneNumber}
              />
            </div>
          </div>
        </div>
        <div
          className={`
          fixed bottom-0 left-1/2 -translate-x-1/2 
          max-w-[480px] min-w-[360px] 
          px-4 py-2.5`}
        >
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
