import Button from '@/components/ui/Button';
import type { Quiz } from '@/types/quiz';

// 퀴즈 최종 결과 (오답 페이지)

type Props = {
  quizList: Quiz[];
  userAnswers: number[];
  onClose: () => void;
};

const QuizSummary = ({ quizList, userAnswers, onClose }: Props) => {
  // 맞힌 문제 개수 계산
  const correctCount = userAnswers.filter((answer, i) => answer === quizList[i].answerIndex).length;

  return (
    <div className='w-full max-w-[480px] min-w-[360px] py-10 mx-auto px-[20px]'>
      {/* 요약 타이틀 */}
      <h2 className='text-xl font-bold mb-2 text-left'>퀴즈 결과 요약</h2>

      {/* 정답 개수 요약 텍스트 */}
      <p className='text-left mb-6'>
        총 {quizList.length}문제 중 {correctCount}문제 맞췄어요!
      </p>

      {/* 각 문제 요약 */}
      <ul className='space-y-6'>
        {quizList.map((quiz, i) => {
          const userAnswer = userAnswers[i];
          const isCorrect = userAnswer === quiz.answerIndex;

          return (
            <li key={i}>
              {/* 문제 문장 */}
              <p className='body-16-b mb-2 mt-8'>
                Q{i + 1}. {quiz.question}
              </p>

              {/* 답변 결과 박스 */}
              <div className='border-2 border-[#D9D9D9] rounded-lg p-4 flex items-center gap-4'>
                {/* O/X 박스 */}
                <div className='w-[45px] h-[45px] bg-[#D9D9D9] rounded-[8px] flex items-center justify-center'>
                  <span className='head-24-eb'>{isCorrect ? 'O' : 'X'}</span>
                </div>

                {/* 사용자의 선택 답안 텍스트 */}
                <p className='body-14-r'>선택 답안: {quiz.options[userAnswer] ?? '선택 안 함'}</p>
              </div>
            </li>
          );
        })}
      </ul>

      {/* 확인 버튼 */}
      <div className='fixed bottom-0 left-1/2 -translate-x-1/2 flex w-full max-w-[480px] min-w-[360px] justify-center pb-[20px] px-[20px]'>
        <Button fullWidth size='large' variant='primary' onClick={onClose}>
          확인
        </Button>
      </div>
    </div>
  );
};

export default QuizSummary;
