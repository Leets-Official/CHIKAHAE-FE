import { Link } from 'react-router-dom';
import { ReactComponent as BellIcon } from '@/assets/icons/bell.svg';
import { ReactComponent as HomeLogo } from '@/assets/icons/homeLogo.svg';

export const HomeTopNav = () => {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 w-[360px] h-[44px] flex flex-row items-center justify-between gap-[10px] p-[10px_20px] bg-white opacity-100 rotate-0">
      <HomeLogo className='w-[64.384px] h-[20.798px]' />
      <Link to="/">
        <BellIcon className="w-6 h-6" />
      </Link>
    </div>
  );
};

export default HomeTopNav;
