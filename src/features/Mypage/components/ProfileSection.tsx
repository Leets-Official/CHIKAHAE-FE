import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as RightIcon } from '@/assets/icons/chevron_right.svg';

interface ProfileSectionProps {
  imgSrc: string;
  nickName: string;
  gender: string;
  birthday: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ imgSrc, nickName, gender, birthday }) => {
  const nav = useNavigate();
  return (
    <div className='w-[360px] h-[108px] flex items-center justify-between px-[20px]'>
      {/* 왼쪽 프로필 리스트 전체 */}
      <div className='flex items-center w-[296px] h-[84px] gap-[20px]'>
        {/* 프로필 아이콘 */}
        <div className='w-[84px] h-[84px] flex items-center justify-center'>
          <img src={imgSrc} alt='profile' className='w-[84px] h-[84px] object-cover' />
        </div>
        {/* 프로필 정보 전체 */}
        <div className='flex flex-col w-[192px] h-[47px] gap-2 justify-center'>
          <span className='w-[192px] h-[23px] body-16-eb'>{nickName}</span>
          <span className='w-[192px] h-[16px] body-14-r text-gray-500'>
            {gender} · {birthday}
          </span>
        </div>
      </div>
      {/* chevron_right 아이콘 */}
      <div className='flex items-center justify-center w-[24px] h-[24px] relative'>
        <RightIcon
          className='text-[#BAC3CB]'
          onClick={() => nav('/edit')}
        />
      </div>
    </div>
  );
};

export default ProfileSection;
