import React from 'react';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import UserInfoList from '@/features/Mypage/components/UserInfoList';
import type { MenuItemType } from '@/features/Mypage/components/UserInfoList';

const menuData: MenuItemType[] = [
  { key: 'name', label: '이름', value: '김양치' },
  { key: 'gender', label: '성별', value: '여성' },
  { key: 'birthDate', label: '생년월일', value: '2099-99-99' },
  { key: 'email', label: '계정', value: 'chikahea@leets.com' },
];

const UserInfoPage: React.FC = () => {

  return (
    <div className='max-w-[430px] min-w-[360px] min-h-screen flex flex-col mx-auto'>
      <GlobalTopNav message='계정 정보' showCancel={false} type='global' />
      <div className='h-[84px]' />

      {/* 사용자 정보 리스트 */}
      <UserInfoList items={menuData} />
    </div>
  );
};

export default UserInfoPage;
