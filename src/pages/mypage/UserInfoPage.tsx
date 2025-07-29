import React from 'react';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import UserInfoList from '@/features/Mypage/userInfo/UserInfoList';
import type { MenuItemType } from '@/features/Mypage/userInfo/UserInfoList';
import { USER_INFO_META } from '@/constants/userInfoMeta';

// 실제 사용자 정보는 아래처럼 가져오거나 props/context 등으로 전달
const userValues: Record<string, string> = {
  name: '김양치',
  gender: '여성',
  birthDate: '2099-99-99',
  email: 'chikahea@leets.com',
};

const menuData: MenuItemType[] = USER_INFO_META.map((meta) => ({
  ...meta,
  value: userValues[meta.key] || '',
}));

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
