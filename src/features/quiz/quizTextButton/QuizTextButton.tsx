import { ReactComponent as Check } from '@/assets/icons/check.svg';
import type { QuizTextButtonProps } from './QuizTextButton.types';

const QuizTextButton = ({ text, onClick, isSelected = false }: QuizTextButtonProps) => {
  return (
    <button
      onClick={onClick}
      className='flex w-[320px] h-[84px] px-4 items-center gap-2 shrink-0 rounded-[8px] border-2 justify-between'
      style={{
        borderColor: isSelected ? 'var(--color-shadow-blue-weak)' : 'var(--color-border-gray)',
        boxShadow: `0px 3px 0px 0px ${
          isSelected ? 'var(--color-shadow-blue-weak)' : 'var(--color-shadow-gray)'
        }`,
        backgroundColor: isSelected ? 'var(--color-bg-tertiary-blue)' : 'var(--color-fg-secondary)',
      }}
    >
      <span
        className='body-16-eb w-full text-left'
        style={{
          lineHeight: '22px',
          color: isSelected ? 'var(--color-fg-accent-blue-weak)' : 'var(--color-fg-strong)',
        }}
      >
        {text}
      </span>
      <Check
        className='w-[24px] h-[24px]'
        style={{
          color: isSelected ? 'var(--color-fg-accent-blue-weak)' : 'var(--color-fg-medium)',
        }}
      />
    </button>
  );
};

export default QuizTextButton;
