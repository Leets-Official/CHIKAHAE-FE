export type QuizOXButtonType = 'o' | 'x';

export interface QuizOXButtonProps {
  type: QuizOXButtonType;
  selected: boolean;
  onClick: () => void;
}
