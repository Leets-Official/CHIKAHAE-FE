// const Home = () => {
//   return <div className='text-3xl font-bold text-center text-blue-600'> Home </div>;
// };
// export default Home;

import { useState } from 'react';
import Toast from '@/components/ui/Toast/Toast';

const Home = () => {
  const [showToast, setShowToast] = useState(false);

  const handleClick = () => {
    setShowToast(true);
  };

  return (
    <div className='p-8'>
      <button onClick={handleClick} className='px-4 py-2 bg-blue-600 text-white rounded'>
        토스트 테스트
      </button>

      {showToast && (
        <Toast
          id='test-toast'
          message='토스트 메세지를 입력해주세요'
          duration={3000}
          onClose={() => setShowToast(false)}
          actionText='확인'
          onActionClick={() => {}}
        />
      )}
    </div>
  );
};

export default Home;
