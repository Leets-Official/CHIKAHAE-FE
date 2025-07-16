import { Link } from 'react-router-dom';
import { ReactComponent as CancelIcon } from '@/assets/icons/cancel.svg';
import { ReactComponent as LeftIcon } from '@/assets/icons/chevron_left.svg';
import { useNavigate } from 'react-router-dom';

interface GlobalTopNavProps {
  message: string;
  isCenter?: boolean;
}

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
      {isCenter ? (
        <NavItem />
      ) : (
        <div className='flex gap-[20px]'>
          <NavItem />
        </div>
      )}

      <Link to='/'>
        <CancelIcon className='h-[30px] w-[30px]' />
      </Link>
    </div>
  );
};
export default GlobalTopNav;
