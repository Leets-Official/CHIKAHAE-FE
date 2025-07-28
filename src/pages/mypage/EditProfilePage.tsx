
import React from 'react';
import { useNavigate } from 'react-router-dom';
import EditMenuList from '@/features/Mypage/components/EditMenuList';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import { BottomNav } from '@/components/ui/Nav/BottomNav';
import profile from '@/assets/icons/profile_default.svg';
import camera from '@/assets/icons/camera.svg';
import type { EditMenuItemType } from '../../features/Mypage/components/EditMenuItem';

const menuData: EditMenuItemType[] = [
  { key: 'nickname', label: '닉네임', path: '/editprofile/nickname' },
  { key: 'name', label: '이름', path: '/editprofile/name' },
  { key: 'gender', label: '성별', path: '/editprofile/gender' },
  { key: 'birthDate', label: '생년월일', path: '/editprofile/birthDate' },
];
const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='w-[360px] max-w-[430px] h-[745px] flex flex-col gap-6 bg-white mx-auto opacity-100'>
      <div className='w-[360px] h-[44px] flex justify-between opacity-100 rotate-0 pt-[10px] pr-[20px] pb-[10px] pl-[20px]'>
        <GlobalTopNav message='마이페이지' showCancel={false} />
      </div>

      {/* 프로필 사진 */}
      <div className='w-[360px] h-[665px] flex flex-col gap-[233px] opacity-100'>
        <div className='w-[360px] h-[346px] flex flex-col gap-[40px] opacity-100'>
          <div className='w-[360px] h-[108px] flex items-center justify-center px-[20px] opacity-100 relative'>
            <img src={profile} alt='profile' className='w-[96px] h-[96px]' />
            <img
              src={camera}
              alt='camera'
              className='w-[28px] h-[28px] absolute right-1/2 translate-x-1/2 bottom-0'
            />
          </div>

          {/* 메뉴 리스트 */}
          <EditMenuList
            items={menuData.map((item) => ({
              ...item,
              onClick: () => navigate(item.path),
            }))}
          />
        </div>
      </div>

      {/* 하단 네비게이션 */}

      <div className='w-[360px] h-[86px] fixed bottom-0 left-1/2 -translate-x-1/2'>
        <BottomNav />
      </div>
    </div>
  );
};

export default EditProfilePage;
