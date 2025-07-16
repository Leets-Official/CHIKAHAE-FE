import { ReactComponent as Quiz_O } from '@/assets/icons/Quiz_O.svg';
import { ReactComponent as Quiz_X } from '@/assets/icons/quiz_X.svg';
import clsx from 'clsx';
import type { QuizOXButtonProps } from './QuizOXButton.types';

const QuizOXButton = ({ type, selected, onClick }: QuizOXButtonProps) => {
  const isAnswerO = type === 'o';

  return (
    <button
      onClick={onClick}
      className={clsx(
        // 기본 스타일
        'flex flex-1 h-[140px] px-[43px] py-[24px] justify-center items-center rounded-[8px] transition-all border-[2px] group',
        // type별 배경색
        isAnswerO ? 'bg-bg-tertiary-blue' : 'bg-bg-tertiary-pink',
        // 상태: 선택됨
        selected
          ? isAnswerO
            ? 'border-border-blue shadow-[0_4px_0_0_var(--color-shadow-blue-medium)]'
            : 'border-border-pink shadow-[0_4px_0_0_var(--color-shadow-pink-weak)]'
          : 'border-transparent',
      )}
    >
      <div className='flex w-[54px] h-full flex-col items-center flex-shrink-0 justify-center'>
        <div className='w-[54px] h-[54px] flex items-center justify-center mb-[16px]'>
          {isAnswerO ? (
            <Quiz_O className='w-[54px] h-[54px] object-contain overflow-visible fill-current text-[color:var(--color-fg-accent-blue-weak)]' />
          ) : (
            <Quiz_X className='w-[54px] h-[54px] object-contain overflow-visible fill-current text-[color:var(--color-fg-accent-pink-weak)]' />
          )}
        </div>
        <span
          className={clsx(
            selected ? 'body-16-eb' : 'body-16-b',
            isAnswerO ? 'text-fg-accent-blue-strong' : 'text-fg-accent-pink-weak',
            'min-h-[22px]',
          )}
        >
          {isAnswerO ? '그렇다' : '아니다'}
        </span>
      </div>
    </button>
  );
};

export default QuizOXButton;
