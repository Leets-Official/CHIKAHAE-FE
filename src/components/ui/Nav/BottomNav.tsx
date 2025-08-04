import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '@/constants/navItems';

export const BottomNav = () => {
  const location = useLocation();

  return (
    <>
      <div
        className={`
          fixed bottom-0 left-1/2 -translate-x-1/2
          w-full max-w-[480px] min-w-[360px]
          z-50
        `}
      >
        <nav
          className={`
            flex h-14 px-[2px]
            justify-between items-center
            bg-bg-tertiary-gray
            border-t border-t-bg-secondary-gray
          `}
          role='navigation'
          aria-label='하단 네비게이션'
        >
          {NAV_ITEMS.map(({ to, icon: Icon }) => {
            const isActive = location.pathname === to;

            return (
              <Link key={to} to={to} className='flex w-full flex-col items-center justify-center'>
                <div
                  className={`
                    flex items-center justify-center box-border
                    ${isActive ? 'rounded-[8px] border-2 border-border-blue bg-bg-tertiary-blue' : ''}
                  `}
                >
                  <Icon className='w-[48px] h-[48px]' />
                </div>
              </Link>
            );
          })}
        </nav>

        {/* 여백도 같이 고정 */}
        <div className='h-[14px] bg-bg-tertiary-gray' />
      </div>
    </>
  );
};

export default BottomNav;
