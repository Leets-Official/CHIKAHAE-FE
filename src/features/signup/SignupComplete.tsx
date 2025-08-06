import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Squirrel } from '@/assets/icons/squirrel.svg';
import SignupBg from '@/assets/images/signupBackground.svg';

const SignupComplete = () => {
  const navigate = useNavigate();

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
                치카해 가입이 완료되었어요!
              </p>

              <p className='text-fg-primary text-[14px] font-normal leading-[16px] tracking-[-0.14px]'>
                이제 치카해의 기능을 모두 이용할 수 있어요.
              </p>
            </div>

            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%-56px)] z-10'>
              <Squirrel />
            </div>
          </div>
        </div>
        <div className='fixed bottom-0 left-1/2 -translate-x-1/2 max-w-[480px] min-w-[360px] w-full px-[20px] py-5.75 z-10'>
          <Button
            variant='primary'
            size='large'
            fullWidth={true}
            onClick={() => navigate('/', { state: { isNewLogin: true } })}
          >
            홈으로 이동하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default SignupComplete;
