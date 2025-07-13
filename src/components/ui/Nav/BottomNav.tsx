import { Link } from 'react-router-dom';
import { ReactComponent as LeftIcon } from '@/assets/images/chevron_left.svg';

export const BottomNav = () => {
  return (
    <nav
      className={`
                fixed bottom-0 left-0 right-0
                flex h-14 px-4
                justify-between
                items-center
                bg-bg-tertiary-gray: #FAFBFC;
                w-full`}
    >
      <Link to='/'>
        <LeftIcon className='w-6 h-6 text-blue-500' />
        치카해
      </Link>
      <Link to='/'>
        <LeftIcon className='w-6 h-6 text-blue-500' />
        치카해
      </Link>
      <Link to='/'>
        <LeftIcon className='w-6 h-6 text-blue-500' />
        치카해
      </Link>
      <Link to='/'>
        <LeftIcon className='w-6 h-6 text-blue-500' />
        치카해
      </Link>
    </nav>
  );
};
