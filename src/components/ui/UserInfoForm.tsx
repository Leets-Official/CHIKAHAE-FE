import InputContainer from './Input/InputContainer';
import RadioButtonContainer from './Button/RadioButton/RadioButtonContainer';
import { useState, useRef } from 'react';
import clsx from 'clsx';

const UserInfoForm = () => {
  const [isActive, setIsActive] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (formRef.current && !formRef.current.contains(e.relatedTarget as Node)) {
      setIsActive(false);
    }
  };

  const containerClass = clsx('w-[320px] rounded-lg border shadow-md overflow-hidden', {
    'border-[#9CA6AF] border-b-[5px]': !isActive,

    'border-[#5fc6f0] border-b-[5px]': isActive,
    'active-block': isActive,
  });

  return (
    <>
      <style>{`
        .active-block > div:not(:first-child) {
          border-top-color: #5fc6f0 !important;
        }
      `}</style>

      <div ref={formRef} className={containerClass} onFocus={handleFocus} onBlur={handleBlur}>
        <InputContainer variant='formTop' />
        <RadioButtonContainer variant='formMiddle' />
        <InputContainer variant='formBottom' />
      </div>
    </>
  );
};

export default UserInfoForm;
