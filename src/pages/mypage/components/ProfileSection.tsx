import React from "react";
import { useNavigate } from "react-router-dom";
import RightIcon from '@/assets/icons/chevron_right.svg';

interface ProfileSectionProps {
  imgSrc: string;
  nickName: string;
  gender: string;
  birthday: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  imgSrc, nickName, gender, birthday,
}) => {
  const nav = useNavigate();
  return (
    <div className="w-[360px] h-[108px] flex items-center justify-between px-[20px] opacity-100" onClick={() => nav("/editprofile")}> 
      {/* 왼쪽 프로필 리스트 전체 */}
      <div className="flex items-center w-[296px] h-[84px] gap-[20px]">
        {/* 프로필 아이콘 */}
        <div className="w-[84px] h-[84px] flex items-center justify-center">
          <img src={imgSrc} alt="profile" className="w-[84px] h-[84px] object-cover opacity-100" />
        </div>
        {/* 프로필 정보 전체 */}
        <div className="flex flex-col w-[192px] h-[47px] gap-2 opacity-100 justify-center">
          <span className="w-[192px] h-[23px] text-base font-semibold opacity-100">{nickName}</span>
          <span className="w-[192px] h-[16px] text-sm text-gray-500 opacity-100">{gender} · {birthday}</span>
        </div>
      </div>
      {/* 오른쪽 > 아이콘 */}
      <div className="flex items-center justify-center w-[24px] h-[24px]">
        <img src={RightIcon} alt="다음" width={24} height={24} className="opacity-100" />
      </div>
    </div>
  );
};

export default ProfileSection;
