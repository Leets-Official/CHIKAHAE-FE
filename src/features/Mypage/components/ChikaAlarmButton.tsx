import {ReactComponent as ClockIcon} from '@/assets/icons/clock.svg';
import {ReactComponent as RightIcon} from '@/assets/icons/chevron_right.svg';
import {useNavigate} from 'react-router-dom';

export default function AlarmRow() {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            onClick={() => navigate('/mypage/alarm')}
            className="w-[320px] h-[64px] flex items-center justify-between rounded-[8px] p-[8px] bg-[#D6F3FF] border-2 border-[#3DAFD9] shadow-[0px_3px_0px_0px_#3DAFD9] text-[#00A0E9] font-semibold text-[16px] hover:brightness-95 active:brightness-90">
            <span className="w-[134px] h-[48px] flex items-center gap-2">
              <ClockIcon />
              <span className='w-[78px] h-[23px] flex items-center head-20-eb text-[#3DAFD9] leading-[23px]'>
                양치 알림
              </span>
            </span>
            <RightIcon className='text-[#3DAFD9]' />
        </button>
    );
}
