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
        border-t border-border-gray
      `}
      role='navigation'
      aria-label='하단 네비게이션'
    >
      {NAV_ITEMS.map(({ to, icon: Icon }) => {
        const isActive = location.pathname === to;

        return (
          <Link
            key={to}
            to={to}
            className='flex flex-col items-center justify-center w-[90px] h-[56px]'
          >
            <div
            className={`
              flex items-center justify-center box-border w-[48px] h-[48px]
              ${isActive
                ? 'rounded-[8px] border-2 border-border-blue bg-bg-tertiary-blue'
                : ''}
            `}
            >
              <Icon className='w-[48px] h-[48px]'/>
            </div>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
