import { Link } from 'react-router-dom';
import { ReactComponent as LeftIcon } from '@/assets/icons/chevron_left.svg';
import { useNavigate } from 'react-router-dom';

export const SignupTopNav = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <nav
      className={`
                fixed top-0 left-1/2 -translate-x-1/2
                flex h-14 px-5 py-2.5
                items-center
                bg-bg-tertiary-gray
                w-full
                justify-between
                max-w-[480px] min-w-[360px]`}
    >
      <button onClick={handleGoBack}>
        <LeftIcon />
      </button>
    </nav>
  );
};

export default SignupTopNav;
