import { Link } from 'react-router-dom';
import { ReactComponent as CancelIcon } from '@/assets/images/cancel.svg';
import { ReactComponent as LeftIcon } from '@/assets/images/Chevron_left.svg';

type NavState = 'center' | 'left';

interface GlobalTopNavProps {
  navState: NavState;
}

export const GlobalTopNav = ({ navState }: GlobalTopNavProps) => {
  const isCenter = navState === 'center';

  return (
    <nav
      className={`
                fixed top-0 left-0 right-0
                flex h-14 px-4
                items-center
                bg-bg-tertiary-gray:#FAFBFC;
                w-full
                justify-between`}
    >
      {isCenter ? (
        <>
          <Link to='/'>
            <LeftIcon className='h-[30px] w-[30px]' />
          </Link>
          <Link to='/'>
            <div className='text-fg-primary text-[16px]'>기록하기 </div>
          </Link>
          <Link to='/'>
            <CancelIcon className='h-[30px] w-[30px]' />
          </Link>
        </>
      ) : (
        <>
          <div className='flex items-center justify-center gap-6'>
            <Link to='/'>
              <LeftIcon className='h-[30px] w-[30px]' />
            </Link>
            <Link to='/'>
              <div className='text-fg-primary text-[16px]'>기록하기 </div>
            </Link>
          </div>
          <Link to='/'>
            <CancelIcon className='h-[30px] w-[30px]' />
          </Link>
        </>
      )}
    </nav>
  );
};

export default GlobalTopNav;
