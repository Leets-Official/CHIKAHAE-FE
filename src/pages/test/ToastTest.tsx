import { useState } from 'react';
import Toast from '@/components/ui/Toast/Toast';

const ToastTest = () => {
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
          message='치카 코인 1개가 적립되었어요.'
          duration={3000}
          onClose={() => setShowToast(false)}
          onActionClick={() => {}}
        />
      )}
    </div>
  );
};

export default ToastTest;
