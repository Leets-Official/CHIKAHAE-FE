import QuizTitle from '@/components/Quiz/QuizTitle/QuizTitle';
import QuizOXButton from '@/components/Quiz/QuizOXButton/QuizOXButton';
import QuizTextButton from '@/components/Quiz/QuizTextButton/QuizTextButton';
import Timer from '@/components/ui/Timer/Timer';
import type { BaseQuizProps } from '@/types/quizView';

// QuizBody의 step이 quiz일 때 렌더링될 화면 (타이머 + 퀴즈 + 답안 선택지)

type QuizContentProps = BaseQuizProps;

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
        <Timer onComplete={onTimeout} />
      </div>

      {/* 퀴즈 컨텐츠 영역 */}
      <div className='flex flex-col items-center justify-start w-full max-w-[480px] min-w-[360px] mx-auto'>
        {/* 문제 제목 표시 (문제 번호 + 질문 텍스트) */}
        <QuizTitle questionNumber={questionNumber} questionText={quiz.question} />

        {/* 퀴즈 타입이 'OX'일 경우 */}
        {quiz.type === 'OX' ? (
          <div className='flex gap-4 mt-[48px]'>
            <QuizOXButton type='o' selected={selectedAnswer === 0} onClick={() => onSelect(0)} />
            <QuizOXButton type='x' selected={selectedAnswer === 1} onClick={() => onSelect(1)} />
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
