import QuizResultBlock from './QuizResultBlock';
import type { QuizResultProps } from './QuizResult.types';
import { ReactComponent as ChikaCoin } from '@/assets/icons/chikaCoin.svg';

const QuizResult = ({
  isCorrect,
  description,
  isLast = false,
  correctCount = 0,
  step = 'result',
}: QuizResultProps) => {
  // 정답/오답 텍스트
  const resultText = isCorrect ? '정답입니다!' : '오답입니다!';

  // 최종 결과 화면을 보여줘야 하는지 여부 판단
  const isFinalResult = isLast && step === 'final';

  return (
    <div className='flex flex-col w-[280px] items-center'>
      {isFinalResult ? (
        <>
          <ChikaCoin className='w-[140px] h-[140px]' />

          {/* 맞힌 문제 수 */}
          <div className='flex flex-col items-center gap-0 mt-[42px]'>
            <div className='body-16-r' style={{ lineHeight: '25px' }}>
              {correctCount}/3
            </div>
            <div className='head-24-eb text-center'>총 {correctCount}문제를 맞히셨습니다!</div>
          </div>

          {/* 해설 텍스트 있으면 출력 */}
          {description && (
            <div className='body-16-r mt-[24px] text-center w-[280px]'>{description}</div>
          )}
        </>
      ) : (
        <>
          {/* 정답 or 오답 표시 */}
          <QuizResultBlock isCorrect={isCorrect} />

          <div className='text-center w-[280px] mt-[42px]'>
            {/* 결과 문구 (정답입니다! / 오답입니다!) */}
            <div className='head-24-eb mb-[24px]'>{resultText}</div>

            {/* 해설 텍스트 있으면 출력 */}
            {description && <div className='body-16-r mt-[24px]'>{description}</div>}
          </div>
        </>
      )}
    </div>
  );
};

export default QuizResult;
