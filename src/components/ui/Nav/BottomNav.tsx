import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '@/constants/navItems';

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav
      className={`
        fixed bottom-0 left-1/2 -translate-x-1/2
        flex h-14 px-1
        justify-between items-center
        bg-bg-tertiary-gray
        w-full max-w-[480px] min-w-[360px]
      `}
      role='navigation'
      aria-label='하단 네비게이션'
    >
      {NAV_ITEMS.map(({ label, to, icon: Icon }) => {
        const isActive = location.pathname === to;

        return (
          <Link
            key={to}
            to={to}
            className='flex w-full flex-col items-center justify-center'
            aria-label={label}
          >
            <Icon className={`w-6 h-6 ${isActive ? 'text-fg-clear-blue' : 'text-gray-400'}`} />
            <span
              className={`text-[12px] mt-1 ${isActive ? 'text-fg-clear-blue' : 'text-gray-400'}`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
