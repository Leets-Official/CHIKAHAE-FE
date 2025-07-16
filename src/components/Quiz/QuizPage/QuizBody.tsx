import QuizContent from '@/components/Quiz/QuizPage/QuizContent';
import QuizResult from '@/components/Quiz/QuizResult/QuizResult';
import clsx from 'clsx';
import type { QuizFlowProps } from '@/types/quizView';

// 퀴즈 본문 내용 렌더링 (QuizContent + QuizResult)

const QuizBody = ({
  step,
  questionNumber,
  quiz,
  selectedAnswer,
  isLastQuestion,
  correctCount,
  onSelect,
  onTimeout,
}: QuizFlowProps) => {
  return (
    <div
      className={clsx(
        'w-full mx-auto flex items-center flex-col',
        step === 'quiz' && 'pt-0',
        step === 'result' && 'pt-[120px]',
        step === 'final' && 'pt-[100px]',
      )}
    >
      <div className='relative'>
        {/* step === quiz일 경우 퀴즈 문항 화면 렌더링 */}
        {step === 'quiz' && (
          <QuizContent
            questionNumber={questionNumber}
            quiz={quiz}
            selectedAnswer={selectedAnswer}
            onSelect={onSelect}
            onTimeout={onTimeout} // 타임아웃 시 콜백
          />
        )}
        {/* step이 result 또는 final일 경우 결과 화면 렌더링 */}
        {(step === 'result' || step === 'final') && (
          <QuizResult
            isCorrect={step === 'result' ? selectedAnswer === quiz.answerIndex : false}
            isLast={isLastQuestion}
            correctCount={correctCount}
            step={step}
            //  result면 해설, final이면 정답 해설 안내
            description={
              step === 'result'
                ? quiz.answerDescription
                : '정답 해설은 아래 해답에서 확인해 보세요.'
            }
          />
        )}
      </div>
    </div>
  );
};

export default QuizBody;
