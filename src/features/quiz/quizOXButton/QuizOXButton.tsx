import { ReactComponent as Quiz_O } from '@/assets/icons/quiz_O.svg';
import { ReactComponent as Quiz_X } from '@/assets/icons/quiz_X.svg';
import clsx from 'clsx';
import type { QuizOXButtonProps } from './QuizOXButton.types';

const QuizOXButton = ({ type, selected, onClick }: QuizOXButtonProps) => {
  const isAnswerO = type === 'o';

  const backgroundColor = isAnswerO ? 'bg-bg-tertiary-blue' : 'bg-bg-tertiary-pink';

  const borderAndShadowClass = selected
    ? isAnswerO
      ? 'border-border-blue shadow-[0_4px_0_0_var(--color-shadow-blue-medium)]'
      : 'border-border-pink shadow-[0_4px_0_0_var(--color-shadow-pink-weak)]'
    : 'border-transparent';

  const iconClass = 'w-[54px] h-[54px] object-contain overflow-visible fill-current';
  const iconColor = isAnswerO
    ? 'text-[color:var(--color-fg-accent-blue-weak)]'
    : 'text-[color:var(--color-fg-accent-pink-weak)]';

  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex flex-1 h-[140px] px-[43px] py-[24px] justify-center items-center rounded-[8px] transition-all border-[2px] group',
        backgroundColor,
        borderAndShadowClass,
      )}
    >
      <div className='flex w-[54px] h-full flex-col items-center flex-shrink-0 justify-center'>
        <div className='w-[54px] h-[54px] flex items-center justify-center mb-[16px]'>
          {isAnswerO ? (
            <Quiz_O className={clsx(iconClass, iconColor)} />
          ) : (
            <Quiz_X className={clsx(iconClass, iconColor)} />
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
