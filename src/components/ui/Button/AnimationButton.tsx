import { ReactComponent as PlayButton } from '@/assets/icons/playButton.svg';
import { ReactComponent as PauseButton } from '@/assets/icons/pauseButton.svg';

interface PlayPauseButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}
const PlayPauseButton = ({ isPlaying, onToggle }: PlayPauseButtonProps) => {
  return <button onClick={onToggle}>{isPlaying ? <PauseButton /> : <PlayButton />}</button>;
};

export default PlayPauseButton;
