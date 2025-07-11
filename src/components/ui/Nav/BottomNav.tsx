import { Link } from 'react-router-dom';
import Chevron_left from '@/assets/images/Chevron_left.svg?react';
export const Bottomnav = () => {
  return (
    <nav
      className={`
                fixed bottom-0 left-0 right-0
                flex h-14 px-4
                justify-between
                items-center
                bg-white
                w-full`}
    >
      <Link to='/'>
        <Chevron_left className='w-6 h-6 text-blue-500' />
        치카해
      </Link>
      <Link to='/'>
        <Chevron_left className='w-6 h-6 text-blue-500' />
        치카해
      </Link>
      <Link to='/'>
        <Chevron_left className='w-6 h-6 text-blue-500' />
        치카해
      </Link>
      <Link to='/'>
        <Chevron_left className='w-6 h-6 text-blue-500' />
        치카해
      </Link>
    </nav>
  );
};
