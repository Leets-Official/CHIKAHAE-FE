import { BottomNav } from '@/components/ui/Nav/BottomNav';
import { TopNav } from '@/components/ui/Nav/TopNav';

const NavTest = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      <TopNav />
      {children}
      <BottomNav />
    </div>
  );
};

export default NavTest;
