import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    // 로그인 안 되어 있으면 로그인 페이지로 리다이렉트
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
