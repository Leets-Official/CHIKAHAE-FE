import { Link } from 'react-router-dom';
import { ReactComponent as GearIcon } from '@/assets/icons/gear.svg';
import { ReactComponent as BellIcon } from '@/assets/icons/bell.svg';

export const HomeTopNav = () => {
  return (
    <nav
      className={`
            fixed top-0 left-1/2 -translate-x-1/2
            flex h-20 px-6
            justify-between
            items-center
            bg-bg-tertiary-gray: #FAFBFC;
            w-full  max-w-[480px] min-w-[360px]`}
    >
      <Link to='/'>
        <div className='text-fg-primary-blue body-16-eb'>치카해</div>
      </Link>
      <div
        className={`flex px-2 m-0 justify-between items-center bg-bg-tertiary-gray:#FAFBFC w-[100px]`}
      >
        <Link to='/'>
          <BellIcon />
        </Link>
        <Link to='/'>
          <GearIcon />
        </Link>
      </div>
    </nav>
  );
};

export default HomeTopNav;
