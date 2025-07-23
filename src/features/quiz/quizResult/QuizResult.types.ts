import type { QuizResultBlockProps } from './QuizResultBlock.types';

export type QuizResultProps = QuizResultBlockProps & {
  description?: string;
  isLast?: boolean;
  correctCount?: number;
  step?: 'result' | 'final';
};
