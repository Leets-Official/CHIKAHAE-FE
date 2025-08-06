import Button from '@/components/ui/Button';
import SignupBg from '@/assets/images/signupBackground.svg';
import { ReactComponent as Squirrel } from '@/assets/icons/squirrel.svg';

interface Props {
  onNext: () => void;
}

const SignupGuardianIntro = ({ onNext }: Props) => {
  return (
    <>
      <div className='flex flex-col items-center min-h-screen w-full'>
        <img
          src={SignupBg}
          alt='Signup Background'
          className='absolute inset-0 w-full h-full object-cover z-0'
        />
        <div className='flex flex-col justify-between w-full pt-11 px-[20px]'>
          <div className='flex flex-col gap-y-10 mt-10 w-full max-w-[480px] mx-auto z-10'>
            <div className='text-left'>
              <p className='text-fg-primary text-[22px] font-extrabold leading-[25px] tracking-[-0.22px] mb-2.5'>
                보호자 정보를 입력해주세요
              </p>
              <p className='text-fg-primary text-[14px] font-normal leading-[16px] tracking-[-0.14px]'>
                14세 미만은 보호자 정보를 필수 입력해주셔야 합니다
              </p>
            </div>

            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%-56px)] z-10'>
              <Squirrel />
            </div>

            <div className='fixed bottom-0 left-1/2 -translate-x-1/2 max-w-[480px] min-w-[360px] w-full px-[20px] py-5.75 z-10'>
              <Button
                variant='primary'
                onClick={onNext}
                size='large'
                fullWidth={true}
                disabled={false}
              >
                동의하고 입력하러 가기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupGuardianIntro;
