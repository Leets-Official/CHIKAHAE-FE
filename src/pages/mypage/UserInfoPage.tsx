import React, { useEffect, useState } from 'react';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import UserInfoList from '@/features/Mypage/userInfo/UserInfoList';
import type { MenuItemType } from '@/features/Mypage/userInfo/UserInfoList';
import { fetchUserProfile } from '@/api/myPage/profileAPI';
import { useNavigate } from 'react-router-dom';

const formatBirth = (birth: string) => {
  // 'YYYY-MM-DD' → 'YYYY.MM.DD'
  return birth.replace(/-/g, '.');
};

const UserInfoPage: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuItemType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const data = await fetchUserProfile();

        const items: MenuItemType[] = [
          { key: 'gender', label: '성별', value: data.gender === 'FEMALE' ? '여성' : '남성' },
          { key: 'birth', label: '생일', value: formatBirth(data.birth) },
          { key: 'email', label: '이메일', value: data.kakaoEmail },
        ];

        setMenuData(items);
      } catch (error) {
        console.error('사용자 정보 불러오기 실패:', error);
      }
    };

    loadUserProfile();
  }, []);

  return (
    <div className='max-w-[430px] min-w-[360px] min-h-screen flex flex-col mx-auto'>
      <GlobalTopNav
        message='계정 정보'
        showCancel={false}
        type='global'
        onClickLeft={() => navigate(-1)}
      />
      <div className='h-[84px]' />

      {/* 사용자 정보 리스트 */}
      <UserInfoList items={menuData} />
    </div>
  );
};

export default UserInfoPage;
