import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';
type InputState = 'enabled' | 'select' | 'disabled' | 'error';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputState?: InputState;
  placeholder?: string;
  value?: string;
}

const Input = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      width,
      disabled,
      name,
      type = 'text',
      style,
      className,
      inputState = 'enabled',
      placeholder,
      value,
      onChange,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) onBlur(e);
    };

    const containerClass = clsx(className);

    const stateClassMap = {
      enabled: {
        border: 'border-[#bac3cb]',
        placeholderColor: 'placeholder:text-[#BAC3CB]',
        text: 'text-black',
        bg: 'bg-white',
      },
      select: {
        border: 'border-[#3DAFD9]',
        placeholderColor: 'placeholder:text-black',
        text: 'text-black',
        bg: 'bg-white',
      },
      error: {
        border: 'border-[#3DAFD9]',
        placeholderColor: 'placeholder:text-black',
        text: 'text-black',
        bg: 'bg-white',
      },
      disabled: {
        border: 'border-[#bac3cb]',
        placeholderColor: 'placeholder:text-[#BAC3CB]',
        text: 'text-[#BAC3CB]',
        bg: 'bg-[#BAC3CB]',
      },
    };

    const { placeholderColor, text } = stateClassMap[inputState];

    const inputClass = clsx(
      ' bg-transparent outline-none',
      'text-[14px] leading-[16px] tracking-[-0.14px] cursor-pointer',

      placeholderColor,
      text,
      disabled && 'text-[#CED6DD] cursor-not-allowed',
    );

    return (
      <div className={containerClass}>
        <input
          {...props}
          ref={ref}
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          onBlur={handleBlur}
          onChange={onChange}
          value={value}
          className={inputClass}
        />
      </div>
    );
  },
);

export default Input;
