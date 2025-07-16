import type { Quiz } from './quiz';

export type BaseQuizProps = {
  questionNumber: number;
  quiz: Quiz;
  selectedAnswer: number | null;
  onSelect: (index: number) => void;
  onTimeout?: () => void;
};
