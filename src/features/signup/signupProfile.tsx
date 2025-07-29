import Image from '@/components/Image';
import fallbackProfile from '@/assets/icons/fallbackProfile.svg';
import InputContainer from '@/components/ui/Input/InputContainer';
import Button from '@/components/ui/Button';

interface SignupProfileProps {
  nickname: string;
  setNickname: (nickname: string) => void;
  profileImage: string | undefined;
  setProfileImage: (profileImage: string) => void;
  onNext: () => void;
}
const SignupProfile = ({ nickname, setNickname, onNext, profileImage }: SignupProfileProps) => {
  const handleProfileImageClick = () => {
    console.log('프로필 사진 클릭(이미지 업로드 기능 구현 예정)');
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const isNicknameEmpty = nickname.trim() === '';
  return (
    <>
      <div
        className='
      flex flex-col 
      min-h-screen justify-between
      pt-11'
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
              프로필을 만들어봐요
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
              치카해에서 사용할 프로필을 만들어주세요
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
            <div
              className='
              w-[108px]
              h-[108px]
              flex
              items-center
              justify-center
              overflow-hidden
              mx-auto                
              cursor-pointer
            '
              onClick={handleProfileImageClick}
            >
              <Image
                src={profileImage || fallbackProfile}
                alt='프로필 사진'
                width={100}
                height={100}
                className='object-cover'
                fallbackSrc={fallbackProfile}
              />
            </div>

            <div className='w-full'>
              <InputContainer
                placeholder='닉네임을 입력해주세요'
                label='닉네임'
                value={nickname}
                onChange={handleNicknameChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`
          fixed bottom-0 left-1/2 -translate-x-1/2 
          w-full max-w-[480px] min-w-[360px] 
          px-4 py-2.5
          `}
      >
        <Button
          variant='primary'
          onClick={onNext}
          size='large'
          fullWidth={true}
          disabled={isNicknameEmpty}
        >
          다음
        </Button>
      </div>
    </>
  );
};

export default SignupProfile;
