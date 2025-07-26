import { Link } from 'react-router-dom';
import { ReactComponent as BellIcon } from '@/assets/icons/bell.svg';
import { ReactComponent as HomeLogo } from '@/assets/icons/homeLogo.svg';

export const HomeTopNav = () => {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 w-full max-w-[480px] min-w-[360px] h-[44px] flex flex-row items-center justify-between gap-[10px] p-[10px_20px] rotate-0">
      <div className="w-[320px] h-[24px] flex flex-row justify-between rotate-0 mx-auto"> 
        <HomeLogo />
        <Link to="/">
          <BellIcon className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

export default HomeTopNav;
