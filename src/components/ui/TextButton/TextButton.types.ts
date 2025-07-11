export type TextButtonVariant = 'primary' | 'default' | 'assistive';
export type TextButtonSize = 'small' | 'medium' | 'large' | 'maxi';

export interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TextButtonVariant;
  size?: TextButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}
