import { ReactComponent as ChikaCoinIcon } from '@/assets/icons/chikaCoin.svg';
import Button from '@/components/ui/Button';
import clsx from 'clsx';

interface Props {
  title: string;
  description: string;
  done: boolean;
  onClick: () => void;
  buttonClassName?: string;
  buttonText?: string;
}

const baseCardClass = 'bg-bg-primary-lightblue border-border-blue shadow-[0_4px_0_0_var(--color-shadow-blue-medium)] cursor-pointer';

const BrushingSessionCard: React.FC<Props> = ({
  title,
  description,
  done,
  onClick,
  buttonClassName = '',
  buttonText,
}) => (
  <div
    className={clsx(
      'w-[130px] h-[170px] flex flex-col gap-[12px] p-[16px] border-2 rounded-[8px] transition-all duration-200',
      baseCardClass,
      done ? 'opacity-50' : 'opacity-100'
    )}
  >
    <div className="w-[98px] h-[94px] flex flex-col gap-[8px]">
      <ChikaCoinIcon className="w-[48px] h-[48px]" />
      <div className="w-[90px] h-[38px] flex flex-col gap-[4px]">
        <span className="body-14-eb text-fg-accent-blue-strong">{title}</span>
        <span className="body-12-r text-fg-accent-blue-weak">{description}</span>
      </div>
    </div>
    <Button
      size="small"
      variant="primary"
      fullWidth
      className={clsx(
        done
          ? 'text-fg-primary-blue bg-bg-primary-lightblue border border-border-blue shadow-none'
          : buttonClassName
      )}
      onClick={onClick}
    >
      {done ? '보상 획득 완료' : buttonText }
    </Button>
  </div>
);

export default BrushingSessionCard;
