import QuizResultBlock from './QuizResultBlock';
import type { QuizResultProps } from './QuizResult.types';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { motion } from 'framer-motion';
import CoinRewardResult from '@/components/ui/CoinRewardResult';

const QuizResult = ({
  isCorrect,
  description,
  isLast = false,
  correctCount = 0,
  step = 'result',
  totalCount = 3,
}: QuizResultProps) => {
  const { width, height } = useWindowSize();

  // 정답/오답 텍스트
  const resultText = isCorrect ? '정답입니다!' : '오답입니다!';

  // 최종 결과 화면을 보여줘야 하는지 여부 판단
  const isFinalResult = isLast && step === 'final';

  // 컨페티 애니메이션 조건
  const showConfetti = isCorrect && step === 'result';

  // 흔들림 애니메이션
  const shakeAnimation = {
    initial: { x: 0 },
    animate: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className='flex flex-col w-[280px] items-center relative'>
      {showConfetti && (
        <div className='fixed top-0 left-0 w-screen h-screen z-50 pointer-events-none'>
          <Confetti
            width={width}
            height={height}
            numberOfPieces={200}
            gravity={0.6}
            recycle={false}
          />
        </div>
      )}
      {isFinalResult ? (
        <CoinRewardResult
          correctCount={correctCount}
          totalCount={totalCount}
          description={description}
        />
      ) : (
        <>
          {/* 정답 or 오답 표시 */}
          <motion.div
            variants={isCorrect ? undefined : shakeAnimation}
            initial={isCorrect ? { scale: 0.8, opacity: 0 } : 'initial'}
            animate={isCorrect ? { scale: 1, opacity: 1 } : 'animate'}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <QuizResultBlock isCorrect={isCorrect} />
          </motion.div>

          <div className='text-center w-[280px] mt-[42px]'>
            <div className='head-24-eb mb-[24px]'>{resultText}</div>
            {description && <div className='body-16-r mt-[24px]'>{description}</div>}
          </div>
        </>
      )}
    </div>
  );
};

export default QuizResult;
