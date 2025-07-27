import { useNavigate } from 'react-router-dom';
import { ReactComponent as CancelIcon } from '@/assets/icons/cancel.svg';
import { ReactComponent as LeftIcon } from '@/assets/icons/chevron_left.svg';

interface GlobalTopNavProps {
  message: string;
  isCenter?: boolean;
  showCancel?: boolean;
  showLeftIcon?: boolean;
  showMessage?: boolean;
  onClickLeft?: () => void;
  type?: 'global' | 'signup';
}

const GlobalTopNav = ({
  isCenter,
  type,
  message = '기록하기',
  showCancel = true,
  showLeftIcon = true,
  onClickLeft,
}: GlobalTopNavProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`
        fixed top-0 left-1/2 -translate-x-1/2
        flex h-14 px-4
        items-center
        bg-bg-tertiary-gray
        w-full
        justify-between
        max-w-[480px] min-w-[360px]`}
    >
      <div className='w-[30px] flex justify-start'>
        {showLeftIcon && (
          <button onClick={onClickLeft ?? (() => navigate(-1))}>
            <LeftIcon className='w-[24px] h-[24px]' />
          </button>
        )}
      </div>

      {type === 'global' && (
        <>
          <div
            className={`
              flex-1 
              ${isCenter ? 'text-left' : 'text-center'} 
              text-fg-primary body-16-eb
            `}
          >
            {message}
          </div>

          <div className='w-[30px] flex justify-end'>
            {showCancel && (
              <button onClick={() => navigate('/')}>
                <CancelIcon className='w-[24px] h-[24px]' />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GlobalTopNav;