import { Link } from 'react-router-dom';
import Setting from './svg/Setting.svg';
import Bell from './svg/Bell.svg';

export const Topnav = () => {
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
        <img src={Setting} alt='Setting' height='30' width='30'></img>
      </Link>
      <Link to='/'>
        <img src={Bell} alt='Bell' height='30' width='30'></img>
      </Link>
    </nav>
  );
};
