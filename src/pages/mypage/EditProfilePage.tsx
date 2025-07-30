import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import InputContainer from '@/components/ui/Input/InputContainer'
import Button from '@/components/ui/Button';
import { ReactComponent as Profile } from '@/assets/images/profile/profile_default.svg';
import { ReactComponent as Camera } from '@/assets/icons/camera.svg';


const EditProfilePage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  return (
    <div className="max-w-[430px] min-w-[360px] min-h-screen flex flex-col gap-6 mx-auto">
      <GlobalTopNav message="프로필 수정" showCancel={false} type="global" />
      <div className="h-[70px]" />

      {/* 프로필 사진 */}
      <div className="w-full h-[126px] px-[20px] flex items-center justify-center relative">
        <Profile className="z-0" />
        <button
          type="button"
          aria-label="프로필 사진 변경"
          className="w-[28px] h-[28px] bg-bg-primary-tangerine rounded-full z-10 flex items-center justify-center absolute top-[89px] left-[239px]"
        >
          <Camera className="z-20" />
        </button>
      </div>

      {/* 인풋창 및 공통 버튼 */}
      <div className="w-full flex flex-col gap-4 ">
        <InputContainer
          placeholder="닉네임을 입력해주세요"
          label="닉네임"
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
        <Button
          size="large"
          variant="primary"
          fullWidth={true}
          onClick={() => {
            localStorage.setItem("nickname", nickname);
            navigate("/mypage");
          }}
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default EditProfilePage;
