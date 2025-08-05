import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Squirrel } from '@/assets/icons/squirrel.svg';
import SignupBg from '@/assets/images/signupBackground.svg';

const SignupComplete = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='flex flex-col items-center min-h-screen w-full '>
        <img
          src={SignupBg}
          alt='Signup Background'
          className='absolute inset-0 w-full h-full object-cover'
        />
        <div className='flex flex-col min-h-screen justify-between pt-11'>
          <div className='flex flex-col gap-y-10 px-5 mt-10 w-full max-w-[480px] min-w-[360px] mx-auto z-10'>
            <div className='w-full text-left'>
              <p className='text-fg-primary text-[22px] font-extrabold leading-[25px] tracking-[-0.22px] self-stretch mb-2.5'>
                치카해 가입이 완료되었어요!
              </p>

              <p className='text-fg-primary text-[14px] font-normal leading-[16px] tracking-[-0.14px] items-stretch'>
                이제 치카해의 기능을 모두 이용할 수 있어요.
              </p>
            </div>

            <div className='flex flex-col items-center justify-center py-25'>
              <Squirrel />
            </div>
          </div>
        </div>
        <div
          className={`fixed bottom-0 left-1/2 -translate-x-1/2 max-w-[480px] min-w-[360px] px-4 py-2.5`}
        >
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
