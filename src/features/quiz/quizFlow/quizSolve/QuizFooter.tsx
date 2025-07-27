import Button from '@/components/ui/Button';
import TextButton from '@/components/ui/TextButton';
import { useNavigate } from 'react-router-dom';
import type { QuizFlowProps } from '@/types/quizView';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';

// 퀴즈 하단부 (하단 버튼 영역 렌더링)

type QuizFooterProps = {
  step: 'start' | QuizFlowProps['step'];
  selectedAnswer: QuizFlowProps['selectedAnswer'];
  onNext: () => void;
  onShowSummary?: () => void;
};

const QuizFooter = ({ step, selectedAnswer, onNext, onShowSummary }: QuizFooterProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return (
    <div className='fixed bottom-0 left-0 right-0 flex justify-center pb-[20px]'>
      <div
        className={clsx(
          'w-full max-w-[480px] min-w-[360px] px-[20px] flex flex-col items-center gap-[8px]',
          {
            'pb-[70px]': step === 'start',
            'pb-[20px]': step !== 'start',
          },
        )}
      >
        {/* 시작 화면: 퀴즈 시작 버튼 */}
        {step === 'start' ? (
          <Button size='large' variant='primary' fullWidth onClick={() => navigate('/quiz')}>
            시작하기
          </Button>
        ) : // 최종 결과 화면: 결과 확인 + 홈 이동 버튼
        step === 'final' ? (
          <>
            <TextButton size='small' variant='default' fullWidth onClick={onShowSummary}>
              퀴즈 결과 확인하기
            </TextButton>
            <Button
              size='large'
              variant='primary'
              fullWidth
              onClick={() => {
                queryClient.invalidateQueries({ queryKey: ['pointBalance'] });
                queryClient.invalidateQueries({ queryKey: ['todayMissions'] });
                navigate('/', { state: { missionCompleted: true, coinAmount: 10 } });
              }}
            >
              홈으로 이동하기
            </Button>
          </>
        ) : (
          // 퀴즈 or 중간 결과 화면: 다음 버튼
          <Button
            size='large'
            variant='primary'
            fullWidth
            onClick={onNext}
            disabled={step === 'quiz' && selectedAnswer === null}
          >
            다음
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizFooter;
