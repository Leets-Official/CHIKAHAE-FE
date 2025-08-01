import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomeTopNav from '@/components/ui/Nav/HomeTopNav';
import BottomNav from '@/components/ui/Nav/BottomNav';
import HomeBanner from '@/features/Home/homeBanner/HomeBanner';
import { ReactComponent as Caution } from '@/assets/icons/caution.svg';
import BrushingSessionList from '@/features/Home/todayMission/BrushingSessionList';
import { useTodayMissions } from '@/hooks/queries/useGetTodayMissions';
import { useToast } from '@/contexts/ToastContext';
import { requestAndRegisterFcmToken } from '@/features/alarm/fcm';

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
  }, []);

  useEffect(() => {
    const { missionCompleted, coinAmount, isNewLogin } = location.state || {};

    // FCM 등록 - 로그인 또는 회원가입 후에만
    if (isNewLogin) {
      requestAndRegisterFcmToken();
      window.history.replaceState({}, document.title); // 뒤로 가기 시 중복 방지
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
    <div className='max-w-[430px] min-w-[360px] w-full min-h-screen flex flex-col items-center mx-auto'>
      {/* 홈 헤더 */}
      <HomeTopNav />
      <div className='h-14' />

      {/* 홈 배너 이미지 */}
      <div className='left-0 h-14'>
        <div className='w-screen flex justify-center'>
          <HomeBanner />
        </div>
      </div>
      <div className='h-[280px]' />

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
