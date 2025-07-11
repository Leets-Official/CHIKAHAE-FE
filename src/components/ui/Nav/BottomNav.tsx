import { Link } from 'react-router-dom';
import LessSign from './svg/LessSign.svg?react';
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
        <LessSign className='w-6 h-6 text-blue-500' />
        치카해
      </Link>
      <Link to='/'>
        <LessSign className='w-6 h-6 text-blue-500' />
        치카해
      </Link>
      <Link to='/'>
        <LessSign className='w-6 h-6 text-blue-500' />
        치카해
      </Link>{' '}
      <Link to='/'>
        <LessSign className='w-6 h-6 text-blue-500' />
        치카해
      </Link>
    </nav>
  );
};
