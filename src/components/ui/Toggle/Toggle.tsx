import { clsx } from 'clsx';

interface ToggleProps {
  isOn: boolean;
  onToggle: (newState: boolean) => void;
}

export default function Toggle({ isOn, onToggle }: ToggleProps) {
  return (
    <button
      type='button'
      onClick={() => onToggle(!isOn)}
      className={clsx(
        'relative rounded-full transition-colors duration-200',
        'w-[34.909px] h-[24px] aspect-[34.91/24]',
        isOn ? 'bg-fg-accent-blue-weak' : 'bg-fg-medium',
      )}
      style={{ flexShrink: 0 }}
    >
      <div
        className={clsx(
          'absolute top-1/2 left-[3px] translate-y-[-50%] w-[17px] h-[17px] rounded-full bg-bg-tertiary-gray transition-transform duration-200',
          isOn ? 'translate-x-[11.9px]' : 'translate-x-0',
        )}
      />
    </button>
  );
}
