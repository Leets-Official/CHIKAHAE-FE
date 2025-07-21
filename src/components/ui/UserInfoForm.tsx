import InputContainer from './Input/InputContainer';
import RadioButtonContainer from './Button/RadioButton/RadioButtonContainer';
import { useRef } from 'react';
import { GENDER } from '@/constants/radioOptions';
import clsx from 'clsx';
import { useState } from 'react';

type UserInfoFormProps = {
  type: 'full' | 'partial';

  name?: string;
  onChangeName?: (value: string) => void;
  gender: string;
  onGenderChange: (value: string) => void;
  birthDate: string;
  onBirthDateChange: (value: string) => void;
};

const UserInfoForm = ({
  type,
  name = '',
  onChangeName = () => {},
  gender,
  onGenderChange,
  birthDate,
  onBirthDateChange,
}: UserInfoFormProps) => {
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

  const containerClass = clsx('rounded-lg border shadow-md overflow-hidden', {
    'border-[#9CA6AF] border-b-[5px]': !isActive,
    'border-[#5fc6f0] border-b-[5px]': isActive,
    'active-block': isActive,
  });

  const activeBlockStyle = `
  .active-block > div:not(:first-child) {
    border-top-color: #5fc6f0 !important;
  }
  ${
    type === 'partial'
      ? `
    .active-block > div:first-child {
      border-top-color: #5fc6f0 !important;
    }
  `
      : ''
  }
`;
  return (
    <>
      <style>{activeBlockStyle}</style>

      <div ref={formRef} className={containerClass} onFocus={handleFocus} onBlur={handleBlur}>
        {type === 'full' && (
          <InputContainer
            label='성명'
            placeholder='이름을 입력해 주세요.'
            variant='formTop'
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeName(e.target.value)}
          />
        )}

        <RadioButtonContainer
          message='성별'
          importance='basic'
          options={GENDER}
          variant='formMiddle'
          selectedValue={gender}
          onValueChange={onGenderChange}
        />

        <InputContainer
          variant='formBottom'
          label='생년월일'
          placeholder='0000.00.00'
          calender
          value={birthDate}
          onChange={onBirthDateChange}
        />
      </div>
    </>
  );
};

export default UserInfoForm;
