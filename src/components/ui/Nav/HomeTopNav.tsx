import { Link } from 'react-router-dom';
import { ReactComponent as BellIcon } from '@/assets/icons/bell.svg';
import { ReactComponent as HomeLogo } from '@/assets/icons/homeLogo.svg';

export const HomeTopNav = () => {
  return (
    <div className="fixed w-full max-w-[480px] min-w-[360px] h-[44px] flex items-center justify-center">
      <div className="w-[360px] h-[24px] flex flex-row items-center justify-between gap-4 rotate-0 mx-auto"> 
        <HomeLogo />
        <Link to="/">
          <BellIcon />
        </Link>
      </div>
    </div>
  );
};

export default HomeTopNav;