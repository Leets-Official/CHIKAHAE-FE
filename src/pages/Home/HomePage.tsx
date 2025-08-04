import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomeTopNav from '@/components/ui/Nav/HomeTopNav';
import BottomNav from '@/components/ui/Nav/BottomNav';
import HomeBanner from '@/features/Home/homeBanner/HomeBanner';
import { ReactComponent as Caution } from '@/assets/icons/caution.svg';
import BrushingSessionList from '@/features/Home/todayMission/BrushingSessionList';
import { useTodayMissions } from '@/hooks/queries/useGetTodayMissions';
import { useToast } from '@/contexts/ToastContext';
import { registerFcmTokenIfPermitted } from '@/features/alarm/registerFcmToken';

const HomePage = () => {
  /**
   * ==== 미션 완료 후 (ex. 퀴즈 끝나고, 양치 끝나고) 아래 코드 호출 필요 ====
   * queryClient.invalidateQueries({ queryKey: ['pointBalance'] });
   * queryClient.invalidateQueries(['todayMissions']);
   * navigate('/', { state: { missionCompleted: true, coinAmount: 미션 보상 코인 수 } });
   */
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  // accessToken 검사 - 로그인 안 했으면 /login으로 리디렉트
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const { missionCompleted, coinAmount, isNewLogin } = location.state || {};

    // FCM 등록: 새 로그인일 경우 권한 요청 포함, 아닌 경우 무조건 토큰만 확보
    if (isNewLogin) {
      console.log('[FCM] 새 로그인이므로 권한 요청 + 등록 시작');
      registerFcmTokenIfPermitted({ requestPermission: true });
      window.history.replaceState({}, document.title);
    } else {
      console.log('[FCM] 기존 로그인 - 권한 없이 토큰만 재등록 시도');
      registerFcmTokenIfPermitted(); // 이미 권한 있으면 재등록
    }

    // 코인 적립 토스트
    if (missionCompleted && coinAmount) {
      showToast({
        message: `치카코인 ${coinAmount}개가 적립되었습니다.`,
        duration: 3000,
      });

      // 뒤로 가기 시 중복 방지
      window.history.replaceState({}, document.title);
    }
  }, [location.state, showToast]);

  const { data: cards = [] } = useTodayMissions();

  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <div className='w-screen max-w-full min-h-screen h-full flex flex-col items-center mx-auto'>
      {/* 홈 헤더 */}
      <HomeTopNav />
      <div className='h-14' />

      {/* 홈 배너 이미지 */}
      <div className='w-full flex justify-center'>
        <HomeBanner />
      </div>

      {/* 날짜+미션 */}
      <div className='w-full pl-[18px] pt-[20px] pb-[25px] flex flex-col mx-auto'>
        <div className='w-full gap-[12px]'>
          <span className='w-[121px] h-[16px] body-14-b'>{dateString}</span>
          <div className='flex flex-row items-center gap-[8px]'>
            <div className='w-[97px] h-[23px] flex items-center head-20-eb'>오늘의 미션</div>
            <Caution className='w-[16px] h-[17px]' />
          </div>
        </div>

        {/* 양치 카드 슬라이드 */}
        <BrushingSessionList cards={cards} />
      </div>

      {/* 하단 네비게이션: 아이템 리스트 */}
      <BottomNav />
      <div className='h-14' />
    </div>
  );
};

export default HomePage;
