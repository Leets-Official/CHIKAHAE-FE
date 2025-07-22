import Button from '@/components/ui/Button';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';

interface Props {
  onNext: () => void;
}

const SignupGuardianIntro = ({ onNext }: Props) => {
  return (
    <>
      <div
        className='
      flex flex-col 
      min-h-screen 
      justify-between 
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
              14세 미만은 보호자 정보를 필수 입력해주셔야 합니다
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
        <Button variant='primary' onClick={onNext} size='large' fullWidth={true} disabled={false}>
          입력하러가기
        </Button>
      </div>
    </>
  );
};

export default SignupGuardianIntro;
