import React, { useState, forwardRef } from 'react';
import clsx from 'clsx';
import type { InputHTMLAttributes, CSSProperties } from 'react';
type InputState = 'enabled' | 'select' | 'disabled' | 'error';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  maxWidth?: string;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
  inputState?: InputState;
  placeholder?: string;
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
      placeholder,
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
        placeholderColor: 'placeholder:text-[#BAC3CB]',
        text: 'text-black',
        bg: 'bg-white',
        icon: 'text-[#9CA6AF]',
      },
      select: {
        border: 'border-[#3DAFD9]',
        placeholderColor: 'placeholder:text-black',
        text: 'text-black',
        bg: 'bg-white',
        icon: 'text-[#3DAFD9]',
      },
      error: {
        border: 'border-[#3DAFD9]',
        placeholderColor: 'placeholder:text-black',
        text: 'text-black',
        bg: 'bg-white',
        icon: 'text-[#3DAFD9]',
      },
      disabled: {
        border: 'border-[#bac3cb]',
        placeholderColor: 'placeholder:text-[#BAC3CB]',
        text: 'text-[#BAC3CB]',
        bg: 'bg-[#BAC3CB]',
        icon: 'text-[#9CA6AF]',
      },
    };

    const { border, placeholderColor, text, bg } = stateClassMap[inputState];

    const inputClass = clsx(
      'w-full bg-transparent outline-none',
      'text-[14px] leading-[16px] tracking-[-0.14px]',
      'flex-1 min-w-0',
      placeholderColor,
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
          placeholder={placeholder}
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
