import InputContainer from './Input/InputContainer';
import RadioButtonContainer from './Button/RadioButton/RadioButtonContainer';
import { useRef } from 'react';
import { GENDER } from '@/constants/radioOptions';
import clsx from 'clsx';
import { useState } from 'react';

type UserInfoFormProps = {
  type: 'full' | 'partial';
  name?: string;
  onNameChange?: (value: string) => void;
  gender: string;
  onGenderChange: (value: string) => void;
  birthDate: string;
  onBirthDateChange: (value: string) => void;
  phoneNumber?: string;
  onPhoneNumberChange?: (value: string) => void;
};

const UserInfoForm = ({
  type,
  name = '',
  onNameChange = () => {},
  gender,
  onGenderChange,
  birthDate,
  onBirthDateChange,
  phoneNumber = '',
  onPhoneNumberChange = () => {},
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
  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, ''); // 숫자만 남김
    let normalized = digits.startsWith('010') ? digits : `010${digits}`;
    normalized = normalized.slice(0, 11); // 010 + 8자리까지만 허용

    return normalized.replace(/^(\d{3})(\d{4})(\d{0,4}).*/, '$1-$2-$3').replace(/-$/, '');
  };

  const containerClass = clsx(
    'rounded-lg shadow-md overflow-hidden',
    'border-t-[2px] border-l-[2px] border-r-[2px] border-b-[5px]',
    {
      'border-[#9CA6AF]': !isActive,
      'border-[#5fc6f0]': isActive,
    },
  );
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onPhoneNumberChange(formatted);
  };

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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onNameChange(e.target.value)}
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
          onValueChange={(value) => onGenderChange(value)}
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
        {type === 'full' && (
          <InputContainer
            label='전화번호'
            placeholder='010-'
            variant='formBottom'
            value={phoneNumber}
            isActive={isActive}
            onChange={handlePhoneChange}
            className={clsx({
              'border-t-border-blue': isActive,
              'border-t-border-gray': !isActive,
            })}
          />
        )}
      </div>
    </>
  );
};

export default UserInfoForm;
