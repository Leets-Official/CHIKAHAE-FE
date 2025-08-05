import { ReactComponent as PlayIcon } from '@/assets/icons/play_icon.svg';
import { ReactComponent as PauseIcon } from '@/assets/icons/pause_icon.svg';

interface AnimationButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
  className?: string;
}

const AnimationButton = ({ isPlaying, onToggle, className }: AnimationButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className={`
        w-[80px] h-[80px] aspect-square flex-shrink-0 
        rounded-full bg-bg-tertiary-blue 
        border-border-blue border-[2px]
        shadow-[0_4px_0_0_var(--color-border-blue)]
        flex items-center justify-center
        hover:scale-105
       ${className ?? ''}
      `}
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
};

export default AnimationButton;
