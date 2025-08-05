import { useState, useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { useNavigate } from 'react-router-dom';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import QuizBody from '@/features/quiz/quizFlow/quizSolve/QuizBody';
import QuizFooter from '@/features/quiz/quizFlow/quizSolve/QuizFooter';
import QuizSummary from '@/features/quiz/quizFlow/QuizSummary';
import { useLocation } from 'react-router-dom';
import { Modal } from '@/components/ui/Modal';
import { checkAnswer, fetchQuizResult } from '@/api/quiz/quizAPI';
import { useQueryClient } from '@tanstack/react-query';
import type { QuizResult } from '@/types/quiz';
import { completeMission } from '@/api/home/missionAPI';

// 퀴즈 (문제 풀이) / 퀴즈 결과 / 최종 결과 화면

type QuizStep = 'quiz' | 'result' | 'final';
type Answer = number | null;

const TOAST_DURATION = 3000;
const TIMEOUT_DELAY = 1000;

const QuizPage = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const quizData = location.state;
  const quizList = quizData?.quizList || [];

  // step - 문제 풀이(quiz), 결과(result), 최종 결과(final)
  const [step, setStep] = useState<QuizStep>('quiz');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 퀴즈 인덱스
  const [selectedAnswer, setSelectedAnswer] = useState<Answer>(null); // 사용자가 선택한 답변
  const [userAnswers, setUserAnswers] = useState<number[]>([]); // 사용자 답변 저장

  const [correctCount, setCorrectCount] = useState(0); // 정답 개수
  const [answerExplanation, setAnswerExplanation] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [checkQuizResult, setCheckQuizResult] = useState<QuizResult | null>(null);

  const [showSummary, setShowSummary] = useState(false); // 최종 결과 화면 이동 여부
  const [showExitModal, setShowExitModal] = useState(false);

  const currentQuiz = quizList[currentQuestionIndex]; // 현재 퀴즈 정보
  const isLastQuestion = currentQuestionIndex === quizList.length - 1; // 마지막 문제 여부

  // 답변 선택 시 호출
  const handleSelect = (index: number) => setSelectedAnswer(index);

  // 제한 시간 초과 시 호출
  const handleTimeout = async () => {
    await processAnswer(null, true); // null과 timeout 여부를 명시
    setTimeout(() => setStep('result'), TIMEOUT_DELAY);
  };

  // 정답 처리 로직
  const processAnswer = async (index: number | null, isTimeout = false) => {
    const selected = isTimeout ? '' : currentQuiz.options[index!] || '';

    try {
      const res = await checkAnswer({
        quizId: currentQuiz.quizId,
        selectedAnswer: selected,
      });

      const { isCorrect, answerDescription } = res.data;

      setIsCorrect(isCorrect);
      setAnswerExplanation(answerDescription);
      if (isCorrect) {
        setCorrectCount((prev) => prev + 1);
        showToast({ message: '치카코인 1개가 적립되었어요.', duration: TOAST_DURATION });
      }
    } catch {
      showToast({
        message: '정답 확인 중 오류가 발생했어요.',
        duration: TOAST_DURATION,
        showIcon: false,
      });
      setIsCorrect(false);
      setAnswerExplanation('정답 확인 실패');
    }

    setUserAnswers((prev) => [...prev, index ?? -1]); // null은 -1로 저장
    setStep('result');
  };

  // 다음 단계로 전환
  const handleNextStep = () => {
    if (step === 'quiz') {
      if (selectedAnswer === null) return;
      processAnswer(selectedAnswer);
    } else if (step === 'result') {
      if (isLastQuestion) {
        showToast({
          message: `총 치카코인 ${correctCount}개를 획득하였습니다.`,
          duration: TOAST_DURATION,
        });
        setStep('final');
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setAnswerExplanation('');
        setStep('quiz');
      }
    }
  };

  const handleLeftClick = () => setShowExitModal(true);

  const confirmExit = () => {
    setShowExitModal(false);
    navigate('/quiz/start'); // 퀴즈 초기화됨
  };

  const handleGoHome = async () => {
    try {
      const coinAmount = await completeMission('DAILY_QUIZ');
      navigate('/', {
        state: {
          missionCompleted: true,
          coinAmount,
        },
      });
    } catch (error) {
      console.log('미션 완료 실패: ', error);
    }
  };

  //최종 결과 도달 시 최종 결과 API 호출
  useEffect(() => {
    const fetchFinalResult = async () => {
      if (step !== 'final') return;

      try {
        const res = await fetchQuizResult();
        const { correctCount, coinReward, checkQuizResponse } = res.data;

        setCorrectCount(correctCount); // API 기준 정답 수로 갱신
        setAnswerExplanation(`치카코인 ${coinReward}개가 적립되었어요!`);
        setCheckQuizResult({ correctCount, coinReward, checkQuizResponse });

        queryClient.invalidateQueries({ queryKey: ['pointBalance'] });
        queryClient.invalidateQueries({ queryKey: ['todayMissions'] });
      } catch {
        showToast({
          message: '최종 결과 조회 중 오류가 발생했어요.',
          duration: TOAST_DURATION,
          showIcon: false,
        });
      }
    };

    fetchFinalResult();
  }, [step]);

  return (
    <div className='relative min-h-screen pt-[18px] flex justify-start items-center flex-col'>
      <GlobalTopNav message='퀴즈' showCancel={false} onClickLeft={handleLeftClick} />
      {showSummary && checkQuizResult ? (
        <QuizSummary
          quizList={quizList}
          userAnswers={userAnswers}
          resultData={checkQuizResult}
          onClose={handleGoHome}
        />
      ) : (
        <>
          {/* 본문 (문제 / 결과) */}
          <QuizBody
            step={step}
            questionNumber={currentQuestionIndex + 1}
            quiz={currentQuiz}
            selectedAnswer={selectedAnswer}
            isLastQuestion={isLastQuestion}
            correctCount={correctCount}
            onSelect={handleSelect}
            onTimeout={handleTimeout}
            isCorrect={isCorrect}
            answerDescription={answerExplanation}
          />
          {/* 하단 버튼 영역 (다음 버튼 / 결과 보기) */}
          <QuizFooter
            step={step}
            selectedAnswer={selectedAnswer}
            onNext={handleNextStep}
            onShowSummary={() => setShowSummary(true)}
            onGoHome={handleGoHome}
          />
        </>
      )}
      {/* 모달 렌더링 */}
      <Modal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        title='나가시겠어요?'
        cancelText='취소'
        confirmText='나가기'
        onConfirm={confirmExit}
      >
        지금 나가면 푼 퀴즈는 저장되지 않아요.
      </Modal>
    </div>
  );
};

export default QuizPage;
