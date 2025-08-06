import Image from '@/components/Image';
import ProfileImage from '@/assets/images/profile/profile_default.svg';
import InputContainer from '@/components/ui/Input/InputContainer';
import SignupBg from '@/assets/images/signupBackground.svg';
import Button from '@/components/ui/Button';

interface SignupProfileProps {
  nickname: string;
  setNickname: (nickname: string) => void;
  onNext: () => void;
}
const SignupProfile = ({ nickname, setNickname, onNext }: SignupProfileProps) => {
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const isNicknameEmpty = nickname.trim() === '';
  return (
    <div className='flex flex-col items-center min-h-screen w-full'>
      <img
        src={SignupBg}
        alt='Signup Background'
        className='absolute inset-0 w-full h-full object-cover'
      />

      <div className='flex flex-col justify-between w-full pt-11 px-[20px]'>
        <div className='flex flex-col gap-y-10 mt-10 w-full max-w-[480px] min-w-[360px] mx-auto z-10'>
          <div className='text-left'>
            <p className='text-fg-primary text-[22px] font-extrabold leading-[25px] tracking-[-0.22px] mb-2.5'>
              프로필을 만들어봐요
            </p>
            <p className='text-fg-primary text-[14px] font-normal leading-[16px] tracking-[-0.14px]'>
              치카해에서 사용할 프로필을 만들어주세요
            </p>
          </div>

          <div className='flex flex-col items-center gap-y-[30px]'>
            <Image
              src={ProfileImage}
              alt='프로필 사진'
              width={100}
              height={100}
              className='object-cover'
            />

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

      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 max-w-[480px] min-w-[360px] w-full px-[20px] py-5.75'>
        <Button
          variant='primary'
          onClick={onNext}
          size='large'
          fullWidth
          disabled={isNicknameEmpty}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default SignupProfile;
