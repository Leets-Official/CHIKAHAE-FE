import { useState } from 'react';

interface RadioButtonProps {
  id: string; // 클릭 영역을 넓힌다(label과 함께)
  name: string; // 같은 name 공유하는 버튼끼리는 하나만 선택이 가능하게
  value: string; //어떤 라디오 버튼이 선택되었는지 구분하기 위한 고유 값
  label: string;
  checked: boolean; // 선택 여부
  onChange: (value: string) => void; // 사용자가 라디오 버튼 클릭하면 발생
  required?: boolean;
}

const RadioButton = ({ id, name, value, label, checked, onChange, required }: RadioButtonProps) => {
  return (
    <>
      <label
        htmlFor={id}
        className='flex flex-row items-center justify-center space-x-1 cursor-pointer select-none'
      >
        {/* 기존 라디오 버튼 숨기기 */}
        <input
          type='radio'
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
          required={required}
          className='sr-only'
        />

        {/* 커스텀 라디오 버튼 */}
        <div
          className={`
                w-4 h-4 rounded-full border-2 
                flex items-center justify-center
                transition-colors duration-200
                ${checked ? 'border-blue_weak' : 'border-border_default'} `}
        >
          {checked && <div className='w-2 h-2 rounded-full bg-blue_weak' />}
        </div>
        <span className='text-sm text-black'>{label}</span>
      </label>
    </>
  );
};

export default RadioButton;
