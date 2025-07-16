import { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { useNavigate } from 'react-router-dom';
import { quizMockData } from '@/mocks/quizMock';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import QuizBody from '@/components/Quiz/QuizPage/QuizBody';
import QuizFooter from '@/components/Quiz/QuizPage/QuizFooter';
import QuizSummary from '@/components/Quiz/QuizPage/QuizSummary';

// 퀴즈 (문제 풀이) / 퀴즈 결과 / 최종 결과 화면

const QuizPage = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  // step - 문제 풀이(quiz), 결과(result), 최종 결과(final)
  const [step, setStep] = useState<'quiz' | 'result' | 'final'>('quiz');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 퀴즈 인덱스
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // 사용자가 선택한 답변
  const [userAnswers, setUserAnswers] = useState<number[]>([]); // 사용자 답변 저장
  const [correctCount, setCorrectCount] = useState(0); // 정답 개수
  const [showSummary, setShowSummary] = useState(false); // 최종 결과 화면 이동 여부

  const currentQuiz = quizMockData.quizList[currentQuestionIndex]; // 현재 퀴즈 정보
  const isLastQuestion = currentQuestionIndex === quizMockData.quizList.length - 1; // 마지막 문제 여부

  // 답변 선택 시 호출
  const handleSelect = (index: number) => setSelectedAnswer(index);

  // 제한 시간 초과 시 호출
  const handleTimeout = () => {
    if (selectedAnswer === null) {
      setSelectedAnswer(-1); // 오답 처리
      setTimeout(() => handleNextStep(), 1000);
    }
  };

  // 다음 단계로 전환
  const handleNextStep = () => {
    if (step === 'quiz') {
      const isCorrect = selectedAnswer === currentQuiz.answerIndex;

      if (isCorrect) {
        setCorrectCount((prev) => prev + 1);
        showToast({ message: '치카코인 1개가 적립되었어요.', duration: 3000 });
      }

      setUserAnswers((prev) => [...prev, selectedAnswer ?? -1]);

      setStep('result'); // 결과 화면으로 전환
    } else if (step === 'result') {
      if (isLastQuestion)
        setStep('final'); // 최종 결과로 전환
      else {
        // 다음 문제로 넘어가기
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setStep('quiz');
      }
    }
  };

  return (
    <div className='relative min-h-screen pt-[18px] flex justify-start items-center flex-col'>
      {showSummary ? (
        <QuizSummary
          quizList={quizMockData.quizList.map((q) => ({ ...q }))}
          userAnswers={userAnswers}
          onClose={() => navigate('/')}
        />
      ) : (
        <>
          {/* 본문 (문제 / 결과) */}
          {step === 'quiz' && <GlobalTopNav isCenter message='퀴즈' />}
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
    </div>
  );
};

export default QuizPage;
