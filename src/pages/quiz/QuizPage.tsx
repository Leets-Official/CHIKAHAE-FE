import { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { useNavigate } from 'react-router-dom';
import { quizMockData } from '@/mocks/quizMock';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import QuizBody from '@/features/quiz/quizFlow/quizSolve/QuizBody';
import QuizFooter from '@/features/quiz/quizFlow/quizSolve/QuizFooter';
import QuizSummary from '@/features/quiz/quizFlow/QuizSummary';
import { Modal } from '@/components/ui/Modal';

// 퀴즈 (문제 풀이) / 퀴즈 결과 / 최종 결과 화면

type QuizStep = 'quiz' | 'result' | 'final';
type Answer = number | null;

const TOAST_DURATION = 3000;
const TIMEOUT_DELAY = 1000;

const QuizPage = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  // step - 문제 풀이(quiz), 결과(result), 최종 결과(final)
  const [step, setStep] = useState<QuizStep>('quiz');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 퀴즈 인덱스
  const [selectedAnswer, setSelectedAnswer] = useState<Answer>(null); // 사용자가 선택한 답변
  const [userAnswers, setUserAnswers] = useState<number[]>([]); // 사용자 답변 저장
  const [correctCount, setCorrectCount] = useState(0); // 정답 개수
  const [showSummary, setShowSummary] = useState(false); // 최종 결과 화면 이동 여부
  const [showExitModal, setShowExitModal] = useState(false);

  const currentQuiz = quizMockData.quizList[currentQuestionIndex]; // 현재 퀴즈 정보
  const isLastQuestion = currentQuestionIndex === quizMockData.quizList.length - 1; // 마지막 문제 여부

  // 답변 선택 시 호출
  const handleSelect = (index: number) => setSelectedAnswer(index);

  // 제한 시간 초과 시 호출
  const handleTimeout = () => {
    if (selectedAnswer === null) {
      setSelectedAnswer(-1); // 오답 처리
      setTimeout(() => handleNextStep(), TIMEOUT_DELAY);
    }
  };

  // 정답 처리 로직
  const processAnswer = () => {
    const isCorrect = selectedAnswer === currentQuiz.answerIndex;

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      showToast({ message: '치카코인 1개가 적립되었어요.', duration: TOAST_DURATION });
    }

    setUserAnswers((prev) => [...prev, selectedAnswer ?? -1]);
  };

  // 다음 단계로 전환
  const handleNextStep = () => {
    if (step === 'quiz') {
      processAnswer();
      setStep('result'); // 결과 화면으로 전환
    } else if (step === 'result') {
      if (isLastQuestion) {
        showToast({
          message: `총 치카코인 ${correctCount}개를 획득하였습니다.`,
          duration: TOAST_DURATION,
        });
        setStep('final'); // 최종 결과로 전환
      } else {
        // 다음 문제로 넘어가기
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setStep('quiz');
      }
    }
  };

  const handleLeftClick = () => {
    setShowExitModal(true);
  };

  const confirmExit = () => {
    setShowExitModal(false);
    navigate('/quiz/start'); // 퀴즈 초기화됨
  };

  return (
    <div className='relative min-h-screen pt-[18px] flex justify-start items-center flex-col'>
      <GlobalTopNav message='퀴즈' showCancel={false} onClickLeft={handleLeftClick} />
      {showSummary ? (
        <QuizSummary
          quizList={quizMockData.quizList.map((q) => ({ ...q }))}
          userAnswers={userAnswers}
          onClose={() => navigate('/')}
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
          />
          {/* 하단 버튼 영역 (다음 버튼 / 결과 보기) */}
          <QuizFooter
            step={step}
            selectedAnswer={selectedAnswer}
            onNext={handleNextStep}
            onShowSummary={() => setShowSummary(true)}
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
