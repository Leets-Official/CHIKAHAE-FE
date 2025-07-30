import {ReactComponent as TimerIcon} from '@/assets/icons/timerIcon.svg';
import {ReactComponent as RightIcon} from '@/assets/icons/chevron_right.svg';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';

export default function ChikaAlarmButton() {
    const navigate = useNavigate();

    return (
      <Button
        type="button"
        onClick={() => navigate('/mypage/alarm')}
        variant="primary"
        size="large"
        className="w-full h-[64px] flex !flex-row !justify-between !items-center rounded-[8px] p-[8px] bg-bg-tertiary-blue border-2 border-border-blue-medium shadow-[0px_3px_0px_0px_var(--color-shadow-blue-medium)] text-fg-secondary-blue hover:brightness-95 active:brightness-90"
      >
        <span className="w-[134px] h-[48px] flex items-center gap-2">
          <TimerIcon />
          <span className='w-[78px] h-[23px] flex items-center head-20-eb text-fg-accent-blue-weak leading-[23px]'>
            양치 알림
          </span>
        </span>
        <RightIcon className='text-fg-accent-blue-weak' />
      </Button>
    );
}
