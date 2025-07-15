import { Link } from 'react-router-dom';
import { ReactComponent as GearIcon } from '@/assets/images/gear.svg';
import { ReactComponent as BellIcon } from '@/assets/images/bell.svg';

export const HomeTopNav = () => {
  return (
    <nav
      className={`
            fixed top-0 left-0 right-0
            flex h-20 px-6
            justify-between
            items-center
            bg-bg-tertiary-gray: #FAFBFC;
            w-full`}
    >
      <Link to='/'>
        <div className='text-fg-primary-blue'>치카해</div>
      </Link>
      <div
        className={`flex px-2 m-0 justify-between items-center bg-bg-tertiary-gray:#FAFBFC w-[100px]`}
      >
        <Link to='/'>
          <BellIcon/>
        </Link>
        <Link to='/'>
          <GearIcon/>
        </Link>
      </div>
    </nav>
  );
};

export default HomeTopNav;
