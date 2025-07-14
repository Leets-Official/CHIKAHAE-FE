import React, { useState, forwardRef } from 'react';
import clsx from 'clsx';
import type { InputHTMLAttributes, CSSProperties } from 'react';

// Input 상태 타입 - 기본(default), 클릭됨(select), 비활성화(disabled)
type InputState = 'enabled' | 'select' | 'disabled' | 'error';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  maxWidth?: string;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
  inputState?: InputState;
}

const Input = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      width,
      maxWidth,
      disabled,
      name,
      type = 'text',
      style,
      className,
      inputState = 'enabled',
      onChange,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) onBlur(e);
    };

    const containerClass = clsx('w-full', className);

    const stateClassMap = {
      enabled: {
        border: 'border-[#bac3cb]',
        placeholder: 'placeholder:text-[#BAC3CB]',
        text: 'text-black',
        bg: 'bg-white',
        icon: 'text-fg-medium',
      },
      select: {
        border: 'border-[#3DAFD9]',
        placeholder: 'placeholder:text-black',
        text: 'text-black',
        bg: 'bg-white',
        icon: 'text-[#3DAFD9]',
      },
      error: {
        border: 'border-[#3DAFD9]',
        placeholder: 'placeholder:text-black',
        text: 'text-black',
        bg: 'bg-white',
        icon: 'text-[#3DAFD9]',
      },
      disabled: {
        border: 'border-[#bac3cb]',
        placeholder: 'placeholder:text-[#BAC3CB]',
        text: 'text-[#BAC3CB]',
        bg: 'bg-[#BAC3CB]',
        icon: 'text-fg-medium',
      },
    };

    const { border, placeholder, text, bg } = stateClassMap[inputState];

    const inputClass = clsx(
      'w-full bg-transparent outline-none',
      'text-[14px] leading-[16px] tracking-[-0.14px]',
      'flex-1 min-w-0',
      placeholder,
      text,
      bg,
      disabled && 'text-[#CED6DD] cursor-not-allowed',
    );

    return (
      <div className={containerClass} style={{ width, maxWidth, ...style }}>
        <input
          {...props}
          ref={ref}
          id={name}
          name={name}
          placeholder='텍스트를 입력해 주세요.'
          type={type}
          disabled={disabled}
          onBlur={handleBlur}
          onChange={onChange}
          className={inputClass}
        />
      </div>
    );
  },
);
export default Input;
