import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  useEffect(() => {
    if (code) {
      console.log('인가 코드:', code);

      setTimeout(() => {
        navigate('/signup');
      }, 1000);
    }

    if (error) {
      console.error('로그인 실패:', error);
      navigate('/login?error=kakao');
    }
  }, [code, error, navigate]);

  return (
    <div className='text-center p-10'>
      <p className='text-lg'>카카오 로그인 처리 중..</p>
    </div>
  );
};

export default KakaoCallback;
