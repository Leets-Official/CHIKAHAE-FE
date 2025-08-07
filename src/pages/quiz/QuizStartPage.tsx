import StartPageTemplate from '@/features/start/StartPageTemplate';
import image from '@/assets/images/quizStart.svg';
import { useNavigate } from 'react-router-dom';
import { fetchTodayQuiz } from '@/api/quiz/quizAPI';
import { useState } from 'react';
import { useTodayMissions } from '@/hooks/queries/useGetTodayMissions';

const QuizStartPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { data: missions, isLoading: missionsLoading } = useTodayMissions();
  const dailyQuiz = missions?.find((m) => m.id === 'DAILY_QUIZ');
  const isQuizCompleted = dailyQuiz?.isCompleted;

  const handleStart = async () => {
    if (isQuizCompleted) return;

    try {
      setLoading(true);
      const data = await fetchTodayQuiz();
      if (data.success) {
        navigate('/quiz', { state: data.data }); // 퀴즈 데이터 넘기기
      } else {
        console.error(data.error?.message || '퀴즈 데이터를 불러오지 못했습니다.');
      }
    } catch (error) {
      console.error('퀴즈 요청 중 오류가 발생했습니다.', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StartPageTemplate
      navTitle='퀴즈'
      imageSrc={image}
      imageAlt='퀴즈 시작 이미지'
      title='매일 퀴즈 도전하기'
      coinText='10 치카코인 획득'
      noticeList={[
        '하루 한 번, 치카박사에 도전하세요!',
        '딱 3문제! OX 2개와 객관식 1개로 가볍게 시작해요.',
        '주의! 퀴즈 도중 나가면 처음부터 다시 시작해야 해요.',
        '정답과 함께 해설도 확인할 수 있어요.',
      ]}
      onStart={handleStart}
      startButtonText={
        missionsLoading
          ? '불러오는 중...'
          : isQuizCompleted
            ? '오늘은 이미 도전 완료!'
            : loading
              ? '퀴즈 불러오는 중...'
              : '시작하기'
      }
      startButtonDisabled={missionsLoading || isQuizCompleted}
    />
  );
};

export default QuizStartPage;
