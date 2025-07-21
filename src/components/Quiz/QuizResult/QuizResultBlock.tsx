import { ReactComponent as Quiz_O } from '@/assets/icons/Quiz_O.svg';
import { ReactComponent as Quiz_X } from '@/assets/icons/Quiz_X.svg';
import type { QuizResultBlockProps } from './QuizResultBlock.types';
import clsx from 'clsx';

const QuizResultBlock = ({ isCorrect }: QuizResultBlockProps) => {
  // 정답 여부에 따라 배경 스타일 설정
  const backgroundGradient = isCorrect
    ? 'bg-[linear-gradient(var(--color-bg-primary-blue)_13.5%,var(--color-fg-accent-blue-weak)_87.62%)]'
    : 'bg-[linear-gradient(var(--color-fg-accent-pink-weak)_13.5%,var(--color-fg-accent-pink-strong)_87.62%)]';

  // 정답 여부에 따라 그림자 색상 설정
  const boxShadow = isCorrect
    ? 'shadow-[0_6px_0_0_var(--color-shadow-blue-strong)]'
    : 'shadow-[0_6px_0_0_var(--color-shadow-pink-strong)]';

  // 정답 여부에 따라 아이콘 컴포넌트(O or X) 선택
  const Icon = isCorrect ? Quiz_O : Quiz_X;

  return (
    <div
      className={clsx(
        'flex justify-center items-center',
        'h-[140px] p-[10px] gap-[10px]',
        'aspect-square rounded-[8px]',
        backgroundGradient,
        boxShadow,
      )}
    >
      {/* 선택된 아이콘(O 또는 X) 렌더링 */}
      <Icon
        className={clsx(
          'w-[84px] h-[84px] aspect-square',
          'fill-current text-[color:var(--color-fg-secondary-strong)]',
        )}
      />
    </div>
  );
};

export default QuizResultBlock;
