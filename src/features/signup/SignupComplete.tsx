import Button from '@/components/ui/Button';
import { Link } from 'react-router-dom';

const SignupComplete = () => {
  return (
    <>
      <div className='flex flex-col min-h-screen justify-between pt-11'>
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
              치카해 가입이 완료되었어요!
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
              이제 치카해의 기능을 모두 이용할 수 있어요.
            </p>
          </div>

          <div
            className='
          flex              
          flex-col       
          items-center    
          gap-y-[30px]     
        '
          ></div>
        </div>
      </div>
      <div
        className={`
          fixed bottom-0 left-1/2 -translate-x-1/2 
          w-full max-w-[480px] min-w-[360px] 
          px-4 py-2.5
          `}
      >
        <Link to='/'>
          <Button variant='primary' size='large' fullWidth={true} disabled={false}>
            치카해 이용하기
          </Button>
        </Link>
      </div>
    </>
  );
};

export default SignupComplete;
