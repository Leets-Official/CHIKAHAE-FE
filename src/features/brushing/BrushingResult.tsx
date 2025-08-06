import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import CoinRewardResult from '@/components/ui/CoinRewardResult';
import { useTodayMissions } from '@/hooks/queries/useGetTodayMissions';
import { getNextAnimationMission } from '@/utils/getNextAnimationMission';
import { completeMission } from '@/api/home/missionAPI';
import { useToast } from '@/contexts/ToastContext';
import { useQueryClient } from '@tanstack/react-query';

// 보상 화면 (코인 획득)

interface BrushingResultProps {
  missionId?: 'MORNING_ANIMATION' | 'LUNCH_ANIMATION' | 'EVENING_ANIMATION';
}

const isValidMissionId = (
  id: string | null,
): id is 'MORNING_ANIMATION' | 'LUNCH_ANIMATION' | 'EVENING_ANIMATION' => {
  return id === 'MORNING_ANIMATION' || id === 'LUNCH_ANIMATION' || id === 'EVENING_ANIMATION';
};

const BrushingResult = ({ missionId }: BrushingResultProps) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  // 오늘의 미션 목록
  const { data: missions } = useTodayMissions();

  //  진입 시 미션 성공 토스트 표시
  useEffect(() => {
    showToast({ message: '양치 미션 성공!', showIcon: false });
  }, [showToast]);

  // 아직 완료되지 않은 애니메이션 미션 중 다음 미션을 가져옴
  const handleGoHome = async () => {
    if (!missions) return;

    const fallbackId = getNextAnimationMission(missions);
    const resolvedMissionId = missionId ?? fallbackId;

    if (!isValidMissionId(resolvedMissionId)) {
      navigate('/');
      return;
    }

    try {
      const coinAmount = await completeMission(resolvedMissionId);
      queryClient.invalidateQueries({ queryKey: ['pointBalance'] });
      queryClient.invalidateQueries({ queryKey: ['todayMissions'] });

      navigate('/', {
        state: { missionCompleted: true, coinAmount },
      });
    } catch (error) {
      console.error('미션 완료 실패:', error);
      showToast({ message: '미션 완료 처리 중 문제가 발생했어요', showIcon: false });
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
