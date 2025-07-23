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

  const containerClass = clsx(
    'rounded-lg shadow-md overflow-hidden',
    'border-t-[2px] border-l-[2px] border-r-[2px] border-b-[5px]',
    {
      'border-[#9CA6AF]': !isActive,
      'border-[#5fc6f0]': isActive,
    },
  );

  return (
    <>
      <div ref={formRef} className={containerClass} onFocus={handleFocus} onBlur={handleBlur}>
        {type === 'full' && (
          <InputContainer
            label='성명'
            placeholder='이름을 입력해 주세요.'
            variant='formTop'
            value={name}
            isActive={isActive}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeName(e.target.value)}
            className={clsx({
              'border-t-border-blue': isActive,
              'border-t-border-gray': !isActive,
            })}
          />
        )}

        <RadioButtonContainer
          message='성별'
          importance='basic'
          options={GENDER}
          variant={type === 'full' ? 'formMiddle' : 'formTop'}
          selectedValue={gender}
          isActive={isActive}
          onValueChange={onGenderChange}
          className={clsx({
            'border-t-border-blue': isActive,
            'border-t-border-gray': !isActive,
          })}
        />

        <InputContainer
          variant='formBottom'
          label='생년월일'
          placeholder='0000.00.00'
          calender
          value={birthDate}
          onChange={onBirthDateChange}
          isActive={isActive}
          className={clsx({
            'border-t-border-blue': isActive,
            'border-t-border-gray': !isActive,
          })}
        />
      </div>
    </>
  );
};

export default UserInfoForm;
