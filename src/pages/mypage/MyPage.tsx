import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '@/assets/images/profile/profile_default.svg';
import ProfileSection from '@/features/Mypage/components/ProfileSection';
import ChikaAlarmButton from '@/features/Mypage/components/ChikaAlarmButton';
import MenuList from '@/features/Mypage/components/MenuList';
import type { MenuItem } from '@/features/Mypage/components/MenuList';
import BottomNav from '@/components/ui/Nav/BottomNav';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import Modal from '@/components/ui/Modal/Modal';

type ModalType = 'logout' | 'withdraw' | null;

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState<ModalType>(null);
  const closeModal = () => setModalType(null);
  const menuData: MenuItem[] = [
    { label: '계정정보', path: '/mypage/userinfo', onClick: () => navigate('/mypage/userinfo') },
    { label: '공지사항', path: '/notice', onClick: () => navigate('/notice') },
    { label: 'FAQ',     path: '/faq', onClick: () => navigate('/faq') },
    { label: '이용약관', path: '/tos', onClick: () => navigate('/tos') },
    { label: '로그아웃', path: '', onClick: () => setModalType('logout') },
    { label: '회원탈퇴', path: '', onClick: () => setModalType('withdraw') },
  ];

  /*  로컬 스토리지에서 닉네임 읽어오기 및 setNickName 확장 */
  const [nickName, setNickName] = useState(
    () => localStorage.getItem('nickname') || '닉네임'
  );

  // 닉네임 변경 시 localStorage에도 저장
  const changeNickName = (newNickName: string) => {
    setNickName(newNickName);
    localStorage.setItem('nickname', newNickName);
  };

  const confirmExit = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <div className='max-w-[430px] min-w-[360px] min-h-screen flex flex-col items-center gap-6 mx-auto'>
        {/* 상단 헤더: 상단 바 */}
        <GlobalTopNav message='마이페이지' showCancel={false} showLeftIcon={false} type="global" />
        <div className='h-[44px]' />

        <div className='w-full h-[508px] flex flex-col'>
          {/* 프로필 & 메뉴 리스트 */}
          <div className='w-full h-[412px] flex flex-col gap-[32px]'>
            <ProfileSection imgSrc={profile} nickName={nickName} setNickName={changeNickName} />
            <MenuList items={menuData} />
          </div>
          <div className='h-[32px]' />
          {/* 치카 알람 버튼 */}
          <div className="px-[20px]">
            <ChikaAlarmButton />
          </div>
        </div>
        {/* 하단 네비게이션 */}
        <BottomNav />
      </div>

      {/* 포탈로 렌더링 되는 모달들 */}
      <Modal
        isOpen={modalType === 'logout'}
        onClose={closeModal}
        title='로그아웃 하시겠어요?'
        cancelText="취소"
        confirmText="확인"
        onConfirm={confirmExit}
      >
        현재 계정에서 로그아웃됩니다.
      </Modal>

      <Modal
        isOpen={modalType === 'withdraw'}
        onClose={closeModal}
        title='정말 탈퇴하시겠어요?'
        cancelText="취소"
        confirmText="확인"
      >
        탈퇴 시 계정이 복구되지 않습니다.
      </Modal>
    </>
  );
};

export default MyPage;
