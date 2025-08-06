import { ReactComponent as ChikaCoin } from '@/assets/icons/chikaCoin.svg';
import { motion } from 'framer-motion';

interface CoinRewardResultProps {
  correctCount?: number;
  totalCount?: number;
  description?: string;
  isQuizPage?: boolean;
}

const CoinRewardResult = ({
  correctCount,
  totalCount = 3,
  description,
  isQuizPage = true,
}: CoinRewardResultProps) => {
  return (
    <>
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
      >
        <ChikaCoin className='w-[140px] h-[140px]' />
      </motion.div>

      <div className='flex flex-col items-center gap-0 mt-[42px]'>
        {isQuizPage && (
          <div className='body-16-r leading-[25px]'>
            {correctCount}/{totalCount}
          </div>
        )}

        <div className='head-24-eb text-center'>
          {isQuizPage ? `총 ${correctCount}문제를 맞히셨습니다!` : '양치 완료!'}
        </div>
      </div>

      {description && (
        <div className='body-16-r mt-[24px] text-center w-[280px]'>{description}</div>
      )}
    </>
  );
};

export default CoinRewardResult;
