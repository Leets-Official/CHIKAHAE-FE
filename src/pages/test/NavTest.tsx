import { BottomNav } from '@/components/ui/Nav/BottomNav';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';

const NavTest = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      <GlobalTopNav isCenter message='탑네비' />
      {/* <HomeTopNav /> */}
      {children}
      <BottomNav />
    </div>
  );
};

export default NavTest;
