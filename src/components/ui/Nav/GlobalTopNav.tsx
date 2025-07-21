import { useNavigate } from 'react-router-dom';
import { ReactComponent as CancelIcon } from '@/assets/icons/cancel.svg';
import { ReactComponent as LeftIcon } from '@/assets/icons/chevron_left.svg';
import { useNavigate } from 'react-router-dom';

interface GlobalTopNavProps {
  message: string;
  isCenter?: boolean;
  showCancel?: boolean;
  showLeftIcon?: boolean;
  onClickLeft?: () => void;
}

<<<<<<< HEAD
export const GlobalTopNav = ({ isCenter, message = '기록하기' }: GlobalTopNavProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  const NavItem = () => {
    return (
      <>
        <button onClick={handleGoBack}>
          <LeftIcon />
        </button>

        <div className='text-fg-primary body-16-eb'>{message}</div>
      </>
    );
  };
=======
export const GlobalTopNav = ({
  isCenter,
  message = '기록하기',
  showCancel = true,
  showLeftIcon = true,
  onClickLeft,
}: GlobalTopNavProps) => {
  const navigate = useNavigate();
>>>>>>> develop

  return (
    <div
      className={`
<<<<<<< HEAD
                fixed top-0 left-1/2 -translate-x-1/2
                flex h-14 px-4
                items-center
                bg-bg-tertiary-gray
                w-full
                justify-between
                max-w-[480px] min-w-[360px]`}
=======
        fixed top-0 left-1/2 -translate-x-1/2
        flex h-14 px-4 items-center
        bg-bg-tertiary-gray
        w-full max-w-[480px] min-w-[360px]
      `}
>>>>>>> develop
    >
      {/* 왼쪽 영역 */}
      <div className='w-[30px] flex justify-start'>
        {showLeftIcon && (
          <button onClick={onClickLeft ?? (() => navigate(-1))}>
            <LeftIcon className='w-[24px] h-[24px]' />
          </button>
        )}
      </div>

      {/* 중앙 메시지 */}
      <div
        className={`
          flex-1 
          ${isCenter ? 'text-left' : 'text-center'} 
          text-fg-primary body-16-eb
        `}
      >
        {message}
      </div>

      {/* 오른쪽 영역 */}
      <div className='w-[30px] flex justify-end'>
        {showCancel && (
          <button onClick={() => navigate('/')}>
            <CancelIcon className='w-[24px] h-[24px]' />
          </button>
        )}
      </div>
    </div>
  );
};
export default GlobalTopNav;
