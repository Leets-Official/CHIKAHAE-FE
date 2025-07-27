import QuizTitle from '@/features/quiz/quizTitle/QuizTitle';
import QuizOXButton from '@/features/quiz/quizOXButton/QuizOXButton';
import QuizTextButton from '@/features/quiz/quizTextButton/QuizTextButton';
import Timer from '@/components/ui/Timer/Timer';
import type { BaseQuizProps } from '@/types/quizView';

// QuizBody의 step이 quiz일 때 렌더링될 화면 (타이머 + 퀴즈 + 답안 선택지)

type QuizContentProps = BaseQuizProps;

const OX_OPTIONS: Record<'O' | 'X', number> = {
  O: 0,
  X: 1,
};

const QuizContent = ({
  questionNumber,
  quiz,
  selectedAnswer,
  onSelect,
  onTimeout,
}: QuizContentProps) => {
  return (
    <>
      {/* 타이머 영역 */}
      <div className='flex justify-center pt-14 py-[18px]'>
        {/* 타이머가 끝나면 onTimeout 콜백 호출 */}
        <Timer key={questionNumber} onComplete={onTimeout} />
      </div>

      {/* 퀴즈 컨텐츠 영역 */}
      <div className='flex flex-col items-center justify-start w-full max-w-[480px] min-w-[360px] mx-auto'>
        {/* 문제 제목 표시 (문제 번호 + 질문 텍스트) */}
        <QuizTitle questionNumber={questionNumber} questionText={quiz.question} />

        {/* 퀴즈 타입이 'OX'일 경우 */}
        {quiz.type === 'OX' ? (
          <div className='flex gap-4 mt-[48px]'>
            <QuizOXButton
              type='o'
              selected={selectedAnswer === OX_OPTIONS.O}
              onClick={() => onSelect(OX_OPTIONS.O)}
            />
            <QuizOXButton
              type='x'
              selected={selectedAnswer === OX_OPTIONS.X}
              onClick={() => onSelect(OX_OPTIONS.X)}
            />
          </div>
        ) : (
          // 객관식 보기인 경우
          <div className='flex flex-col gap-4 mt-[48px]'>
            {quiz.options.map((option, index) => (
              <QuizTextButton
                key={index}
                text={option}
                isSelected={selectedAnswer === index}
                onClick={() => onSelect(index)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default QuizContent;
