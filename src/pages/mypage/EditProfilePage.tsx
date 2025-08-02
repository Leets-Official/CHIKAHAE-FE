import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import InputContainer from '@/components/ui/Input/InputContainer';
import Button from '@/components/ui/Button';
import { ReactComponent as Profile } from '@/assets/images/profile/profile_default.svg';
import { updateUserProfile } from '@/api/myPage/profileAPI';
import { useToast } from '@/contexts/ToastContext';

const EditProfilePage = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(() => localStorage.getItem('nickname') || '');
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      showToast({ message: '닉네임을 입력해주세요.', showIcon: false });
      return;
    }

    try {
      await updateUserProfile({
        nickname,
        profileImage: '',
      });

      // 업데이트 성공했을 경우 로컬스토리지 업데이트
      localStorage.removeItem('nickname');
      localStorage.setItem('nickname', nickname);

      navigate('/mypage');
    } catch (error) {
      console.error(error);
      showToast({ message: '프로필 수정에 실패했어요.', showIcon: false });
    }
  };

  return (
    <div className='max-w-[430px] min-w-[360px] min-h-screen flex flex-col gap-6 mx-auto'>
      <GlobalTopNav message='프로필 수정' showCancel={false} type='global' />
      <div className='h-[70px]' />

      {/* 프로필 사진 */}
      <div className='w-full h-[126px] px-[20px] flex items-center justify-center relative'>
        <Profile className='z-0' />
      </div>

      {/* 인풋창 및 공통 버튼 */}
      <div className='w-full flex flex-col gap-4 '>
        <InputContainer
          placeholder={nickname}
          label='닉네임'
          value={nickname}
          onChange={handleNicknameChange}
        />
      </div>

      <div
        className={`
          fixed bottom-0 left-1/2 -translate-x-1/2 
          w-full max-w-[480px] min-w-[360px] 
          px-4 py-2.5`}
      >
        <Button size='large' variant='primary' fullWidth={true} onClick={handleSubmit}>
          확인
        </Button>
      </div>
    </div>
  );
};

export default EditProfilePage;
