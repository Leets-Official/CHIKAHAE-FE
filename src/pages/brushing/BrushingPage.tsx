import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BrushingAnimation from '@/features/brushing/BrushingAnimation';
import BrushingResult from '@/features/brushing/BrushingResult';
import BrushingHeader from '@/features/brushing/BrushingHeader';
import BrushingTip from '@/features/brushing/BrushingTip';
import ExitConfirmModal from '@/features/brushing/ExitConfirmModal';
import BrushingDog from '@/assets/lottie/brushing_dog.json';
import BrushingRabbit from '@/assets/lottie/brushing_rabbit.json';
import BrushingSquirrel from '@/assets/lottie/brushing_squirrel.json';
import DefendDog from '@/assets/lottie/defend_dog.json';
import DefendRabbit from '@/assets/lottie/defend_rabbit.json';
import DefendSquirrel from '@/assets/lottie/defend_squirrel.json';
import { COUNTDOWN_TEXT } from '@/constants/counterdownText';

// 짝수 index가 양치 애니메이션인지 판별 (짝수: 양치, 홀수: 방어 애니메이션)
const isBrushingAnimation = (index: number) => index % 2 === 0;

const BrushingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const missionId = location.state?.missionId;

  // 카운트다운 상태
  const [countdownIndex, setCountdownIndex] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(true);

  // 애니메이션 재생 상태
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [animationIndex, setAnimationIndex] = useState(0);

  // 종료 확인 모달 표시 여부
  const [showExitModal, setShowExitModal] = useState(false);

  // 애니메이션 배열 (양치 -> 방어 순서 반복)
  const animations = [
    BrushingRabbit,
    DefendRabbit,
    BrushingDog,
    DefendDog,
    BrushingSquirrel,
    DefendSquirrel,
  ];

  // 애니메이션 타이머 관련 ref
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationStartTimeRef = useRef<number | null>(null);
  const remainingTimeRef = useRef<number>(30000);

  // duration 구하는 함수
  const getCurrentDuration = (index: number) => {
    const isLast = index === animations.length - 1;
    return isLast ? 35000 : 30000; // 마지막 애니메이션은 35초
  };

  // 타이머 시작
  const startAnimationTimer = () => {
    animationStartTimeRef.current = Date.now();
    const duration = getCurrentDuration(animationIndex);
    remainingTimeRef.current = duration;

    animationTimerRef.current = setTimeout(() => {
      // 마지막 애니메이션이면 종료
      const isLast = animationIndex === animations.length - 1;
      if (isLast) {
        setIsPlaying(false);
        setIsFinished(true);
        audioRef.current?.pause();
      } else {
        setAnimationIndex((prev) => (prev + 1) % animations.length);
        remainingTimeRef.current = getCurrentDuration(animationIndex + 1);
      }
    }, duration);
  };

  // 타이머 정지
  const pauseAnimation = () => {
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
      animationTimerRef.current = null;
    }
    const now = Date.now();
    const elapsed = now - (animationStartTimeRef.current ?? now);
    remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
  };

  // isPlaying 상태 변화 감지 (타이머 관리)
  useEffect(() => {
    if (isFinished) return;

    if (isPlaying) {
      remainingTimeRef.current = getCurrentDuration(animationIndex);
      startAnimationTimer();
    } else {
      pauseAnimation();
    }

    // 타이머 중복 제거
    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
        animationTimerRef.current = null;
      }
    };
  }, [isPlaying, animationIndex, isFinished]);

  // 애니메이션 전환 시 타이머 재설정
  useEffect(() => {
    if (isFinished || !isPlaying) return;
    remainingTimeRef.current = getCurrentDuration(animationIndex);
    startAnimationTimer();
  }, [animationIndex]);

  // 헤더 왼쪽 버튼 클릭 시 처리
  const handleLeftClick = () => {
    if (isFinished)
      navigate('/'); // 완료된 경우 홈으로 이동
    else setShowExitModal(true); // 진행 중이면 종료 확인 모달
  };

  // 종료 모달에서 확인 누른 경우
  const confirmExit = () => {
    setShowExitModal(false);
    navigate('/brush/start'); // 양치 시작 페이지로 이동
  };

  // 배경 음악 자동 재생
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 1;

    const tryPlay = async () => {
      try {
        await audio.play();
      } catch (err) {
        console.warn('음원이 로드되지 않았어요:', err);
      }
    };

    tryPlay();
  }, []);

  // 카운트다운
  const isLastCountdown = countdownIndex === COUNTDOWN_TEXT.length - 1;

  useEffect(() => {
    if (!isCountingDown) return;

    const timeout = setTimeout(() => {
      if (isLastCountdown) {
        setIsCountingDown(false);
        setIsPlaying(true);
      } else {
        setCountdownIndex((prev) => prev + 1);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [countdownIndex, isCountingDown]);

  return (
    <div className='flex flex-col w-full max-w-[430px] min-w-[360px] min-h-screen mx-auto relative'>
      {/* 배경 음악 */}
      <audio ref={audioRef} src='/bgm/animation_bgm.mp3' loop />

      {isFinished ? (
        // 양치 종료 후 결과 화면
        <BrushingResult missionId={missionId} />
      ) : (
        <>
          {/* 헤더 (타이머 및 종료 버튼 포함) */}
          <BrushingHeader
            isPlaying={isPlaying}
            onTimeout={() => {
              setIsPlaying(false);
              setIsFinished(true);
              audioRef.current?.pause(); // 타이머 끝나면 정지
            }}
            onClickLeft={handleLeftClick}
          />

          {/* 애니메이션과 헤더 간 여백 */}
          <div className='h-[36.5px]' />

          {/* 애니메이션 컴포넌트 */}
          <BrushingAnimation
            animationData={animations[animationIndex]}
            animationIndex={animationIndex}
            isBrushingAnimation={isBrushingAnimation}
            isPlaying={isPlaying}
            isCountingDown={isCountingDown}
            countdownIndex={countdownIndex}
            onTogglePlay={() => setIsPlaying((prev) => !prev)}
          />

          {/* 양치 툴팁 */}
          <BrushingTip isPlaying={isPlaying} />
        </>
      )}

      {/* 종료 확인 모달 */}
      {showExitModal && (
        <ExitConfirmModal isOpen onClose={() => setShowExitModal(false)} onConfirm={confirmExit} />
      )}
    </div>
  );
};

export default BrushingPage;
