import Button from '@/components/ui/Button';
import UserInfoForm from '@/components/ui/UserInfoForm';
import SignupBg from '@/assets/images/signupBackground.svg';
import { isOver14 } from '@/utils/date';

interface SignupInfoProps {
  gender: string;
  setGender: (gender: string) => void;
  birthDate: string;
  setBirthDate: (birthDate: string) => void;
  onNext: (nextStep: 'complete' | 'guardianIntro') => void;
}

const SignupInfo = ({ gender, setGender, birthDate, setBirthDate, onNext }: SignupInfoProps) => {
  const isFormIncomplete = !gender || !birthDate;

  const handleNext = () => {
    const nextStep = isOver14(birthDate) ? 'complete' : 'guardianIntro';
    onNext(nextStep);
  };

  return (
    <>
      <div className='flex flex-col items-center min-h-screen w-full '>
        <img
          src={SignupBg}
          alt='Signup Background'
          className='absolute inset-0 w-full h-full object-cover mx-auto'
        />
        <div
          className='
      flex flex-col 
      min-h-screen justify-between 
      pt-11
      z-10
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
                필수 정보를 입력해주세요
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
                치카해에서 사용할 필수 정보를 입력해주세요
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
              <div className='w-full cursor-pointer'>
                <UserInfoForm
                  type='partial'
                  gender={gender}
                  onGenderChange={setGender}
                  birthDate={birthDate}
                  onBirthDateChange={setBirthDate}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`
          fixed bottom-0 left-1/2 -translate-x-1/2
          max-w-[480px] min-w-[360px] 
          px-4 py-5.75 z-10
          `}
        >
          <Button
            variant='primary'
            onClick={handleNext}
            size='large'
            fullWidth={true}
            disabled={isFormIncomplete}
          >
            다음
          </Button>
        </div>
      </div>
    </>
  );
};

export default SignupInfo;
