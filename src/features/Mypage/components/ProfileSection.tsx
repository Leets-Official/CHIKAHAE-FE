import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as RightIcon } from '@/assets/icons/chevron_right.svg';

interface ProfileSectionProps {
  imgSrc: string;
  nickName: string;
  setNickName?: (newNickName: string) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ imgSrc, nickName }) => {
  const nav = useNavigate();
  return (
    <div className='w-full h-[108px] flex items-center justify-between px-[20px]'>
      {/* 왼쪽 프로필 리스트 전체 */}
      <div className='flex items-center w-[296px] h-[84px] gap-[20px]'>
        {/* 프로필 아이콘 */}
        <img src={imgSrc} alt='profile' className='w-[84px] h-[84px] object-cover' />
        {/* 프로필 정보 전체 */}
        <div className='flex flex-col w-[192px] h-[47px] gap-2 justify-center'>
          <span className='w-[192px] h-[23px] body-16-eb'>{nickName}</span>
        </div>
      </div>
      {/* chevron_right 아이콘 */}
      <div className='flex items-center justify-center w-[24px] h-[24px] relative'>
        <RightIcon
          className='text-fg-medium z-0'
          onClick={() => nav('/edit')}
        />
      </div>
    </div>
  );
};

export default ProfileSection;
