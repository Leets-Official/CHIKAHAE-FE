import { Bottomnav } from '@/components/ui/Nav/BottomNav';
import { Topnav } from '@/components/ui/Nav/TopNav';

const NavTest = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      <Topnav />
      {children}
      <Bottomnav />
    </div>
  );
};

export default NavTest;
