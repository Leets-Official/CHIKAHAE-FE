import QuizContent from '@/features/quiz/quizFlow/quizSolve/QuizContent';
import QuizResult from '@/features/quiz/quizResult/QuizResult';
import clsx from 'clsx';
import type { QuizFlowProps } from '@/types/quizView';

// 퀴즈 본문 내용 렌더링 (QuizContent + QuizResult)

type QuizBodyProps = QuizFlowProps & {
  isCorrect: boolean;
  answerDescription: string;
};

const QuizBody = ({
  step,
  questionNumber,
  quiz,
  selectedAnswer,
  isLastQuestion,
  correctCount,
  onSelect,
  onTimeout,
  isCorrect,
  answerDescription,
}: QuizBodyProps) => {
  const isQuizStep = step === 'quiz';
  const isResultStep = step === 'result' || step === 'final';

  const resultDescription =
    step === 'result' ? answerDescription : '정답 해설은 아래 해답에서 확인해 보세요.';

  const containerPadding = {
    quiz: 'pt-0',
    result: 'pt-[120px]',
    final: 'pt-[100px]',
  }[step];

  return (
    <div
      className={clsx(
        'w-full max-w-[480px] min-w-[360px] mx-auto flex items-center flex-col',
        containerPadding,
      )}
    >
      <div className='relative'>
        {/* step === quiz일 경우 퀴즈 문항 화면 렌더링 */}
        {isQuizStep && (
          <QuizContent
            questionNumber={questionNumber}
            quiz={quiz}
            selectedAnswer={selectedAnswer}
            onSelect={onSelect}
            onTimeout={onTimeout}
          />
        )}
        {/* step이 result 또는 final일 경우 결과 화면 렌더링 */}
        {isResultStep && (
          <QuizResult
            isCorrect={step === 'result' ? isCorrect : false}
            isLast={isLastQuestion}
            correctCount={correctCount}
            step={step}
            description={resultDescription}
          />
        )}
      </div>
    </div>
  );
};

export default QuizBody;
