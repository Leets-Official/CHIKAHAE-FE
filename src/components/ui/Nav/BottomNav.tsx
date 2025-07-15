import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as LeftIcon } from '@/assets/icons/chevron_left.svg';
import { NAV_ITEMS } from '@/constants/navItems';
import { ReactComponent as HomeIcon } from '@/assets/icons/home.svg';
import { ReactComponent as ChikaIcon } from '@/assets/icons/chika.svg';
import { ReactComponent as QuizIcon } from '@/assets/icons/quiz.svg';
import { ReactComponent as MyPageIcon } from '@/assets/icons/mypage.svg';

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
