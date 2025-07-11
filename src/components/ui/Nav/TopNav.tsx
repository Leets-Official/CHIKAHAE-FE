import { Link } from 'react-router-dom';
import { ReactComponent as GearIcon } from '@/assets/images/gear.svg';
import { ReactComponent as BellIcon } from '@/assets/images/bell.svg';

export const TopNav = () => {
  return (
    <nav
      className={`
            fixed top-0 left-0 right-0
            flex h-14 px-4
            justify-between
            items-center
            bg-white
            w-full`}
    >
      <Link to='/'>치카해</Link>
      <Link to='/'>
        <GearIcon className='h-[30px] w-[30px]' />
      </Link>
      <Link to='/'>
        <BellIcon className='h-[30px] w-[30px]' />
      </Link>
    </nav>
  );
};
