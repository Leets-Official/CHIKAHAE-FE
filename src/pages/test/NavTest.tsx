import { BottomNav } from '@/components/ui/Nav/BottomNav';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import { HomeTopNav } from '@/components/ui/Nav/HomeTopNav';

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
