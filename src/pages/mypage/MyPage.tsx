import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '@/assets/images/profile/profile_default.svg';
import ProfileSection from '@/features/Mypage/userProfile/ProfileSection';
import AlarmButton from '@/features/Mypage/alarm/AlarmButton';
import MenuList from '@/features/Mypage/menu/MenuList';
import type { MenuItem } from '@/features/Mypage/menu/MenuList';
import BottomNav from '@/components/ui/Nav/BottomNav';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import Modal from '@/components/ui/Modal/Modal';
import { logout, withdraw } from '@/api/myPage/authAPI';
import { useToast } from '@/contexts/ToastContext';
import { clearFcmToken } from '@/utils/fcmTokenMAnager';

type ModalType = 'logout' | 'withdraw' | null;

const MyPage: React.FC = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [modalType, setModalType] = useState<ModalType>(null);
  const closeModal = () => setModalType(null);

  // FIXME: 경로 수정 필요
  const menuData: MenuItem[] = [
    { label: '계정정보', path: '/mypage/userinfo', onClick: () => navigate('/mypage/userinfo') },
    { label: '공지사항', path: '/notice', onClick: () => navigate('/notice') },
    { label: 'FAQ', path: '/faq', onClick: () => navigate('/faq') },
    { label: '이용약관', path: '/tos', onClick: () => navigate('/tos') },
    { label: '로그아웃', path: '', onClick: () => setModalType('logout') },
    { label: '회원탈퇴', path: '', onClick: () => setModalType('withdraw') },
  ];

  const [nickName] = useState(() => localStorage.getItem('nickname') || '닉네임');

  // 로그아웃
  const handleLogout = async () => {
    try {
      await clearFcmToken();
      await logout();
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      showToast({ message: '로그아웃에 실패했습니다.', showIcon: false });
    }
  };

  // 회원 탈퇴
  const handleWithdraw = async () => {
    try {
      await clearFcmToken();
      await withdraw();
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      showToast({ message: '회원 탈퇴에 실패했습니다.', showIcon: false });
    }
  };

  return (
    <>
      <div className='max-w-[430px] min-w-[360px] min-h-screen flex flex-col items-center gap-6 mx-auto'>
        {/* 상단 헤더: 상단 바 */}
        <GlobalTopNav message='마이페이지' showCancel={false} showLeftIcon={false} type='global' />
        <div className='h-[44px]' />

        <div className='w-full flex flex-col'>
          {/* 프로필 & 메뉴 리스트 */}
          <div className='w-full flex flex-col gap-[32px]'>
            <ProfileSection imgSrc={profile} nickName={nickName} />
            <MenuList items={menuData} />
          </div>
          <div className='h-[32px]' />
          {/* 치카 알람 버튼 */}
          <div className='px-[20px]'>
            <AlarmButton />
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
        cancelText='취소'
        confirmText='확인'
        onConfirm={handleLogout}
      >
        현재 계정에서 로그아웃됩니다.
      </Modal>

      <Modal
        isOpen={modalType === 'withdraw'}
        onClose={closeModal}
        title='정말 탈퇴하시겠어요?'
        cancelText='취소'
        confirmText='확인'
        onConfirm={handleWithdraw}
      >
        탈퇴 시 계정이 복구되지 않습니다.
      </Modal>
    </>
  );
};

export default MyPage;
