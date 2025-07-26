import { Link } from 'react-router-dom';
import { ReactComponent as BellIcon } from '@/assets/icons/bell.svg';
import { ReactComponent as HomeLogo } from '@/assets/icons/homeLogo.svg';

export const HomeTopNav = () => {
  return (
    <div className='fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] min-w-[360px] p-[10px_20px] h-14 flex items-center justify-between bg-bg-tertiary-gray z-999'>
      <HomeLogo />
      <Link to='/'>
        <BellIcon />
      </Link>
    </div>
  );
};

export default HomeTopNav;
