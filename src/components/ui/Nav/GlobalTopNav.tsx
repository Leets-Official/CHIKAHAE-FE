import { Link } from 'react-router-dom';
import { ReactComponent as CancelIcon } from '@/assets/images/cancel.svg';
import { ReactComponent as LeftIcon } from '@/assets/images/chevron_left.svg';

interface GlobalTopNavProps {
  message: string;
  isCenter?: boolean;
}

export const GlobalTopNav = ({ isCenter, message = '기록하기' }: GlobalTopNavProps) => {
  const NavItem = () => {
    return (
      <>
        <Link to='/'>
          <LeftIcon />
        </Link>
        <div className='text-fg-primary text-[16px]'>{message}</div>
      </>
    );
  };

  return (
    <div
      className={`
                fixed top-0 left-0 right-0
                flex h-14 px-4
                items-center
                bg-bg-tertiary-gray:#FAFBFC
                w-full
                justify-between`}
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
