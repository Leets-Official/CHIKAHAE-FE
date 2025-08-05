import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import CoinRewardResult from '@/components/ui/CoinRewardResult';
import { useTodayMissions } from '@/hooks/queries/useGetTodayMissions';
import { getNextAnimationMission } from '@/utils/getNextAnimationMission';
import { completeMission } from '@/api/home/missionAPI';

// 보상 화면 (코인 획득)

const BrushingResult = () => {
  const navigate = useNavigate();

  // 오늘의 미션 목록
  const { data: missions } = useTodayMissions();

  // "홈으로 이동하기" 버튼 클릭 시 동작
  const handleGoHome = async () => {
    if (!missions) return;

    // 아직 완료되지 않은 애니메이션 미션 중 다음 미션을 가져옴
    const nextMission = getNextAnimationMission(missions);
    if (!nextMission) {
      navigate('/');
      return;
    }

    try {
      // 다음 미션을 완료 처리하고 보상 코인 수량을 받음
      const coinAmount = await completeMission(
        nextMission as 'MORNING_ANIMATION' | 'LUNCH_ANIMATION' | 'EVENING_ANIMATION',
      );
      // 홈으로 이동하면서 보상 정보를 state로 전달
      navigate('/', {
        state: { missionCompleted: true, coinAmount },
      });
    } catch (error) {
      console.error('미션 완료 실패:', error);
    }
  };

  return (
    <>
      {/* 상단 여백 (Header와 간격) */}
      <div className='h-14' />

      <div className='h-[100px]' />

      {/* 보상 결과 표시 영역 */}
      <div className='flex flex-col w-full max-w-[480px] min-w-[360px] justify-center items-center mx-auto'>
        <CoinRewardResult isQuizPage={false} description='하루 3번, 양치 미션에 성공했어요!' />
      </div>

      {/* 하단 버튼 영역 */}
      <div className='flex justify-center mt-auto'>
        <div className='w-full max-w-[480px] min-w-[360px] px-[20px] pb-[20px]'>
          <Button size='large' variant='primary' fullWidth onClick={handleGoHome}>
            홈으로 이동하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default BrushingResult;
