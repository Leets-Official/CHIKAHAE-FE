import React, { useState, forwardRef } from 'react';
import clsx from 'clsx';
import type { InputHTMLAttributes, CSSProperties } from 'react';

// Input 상태 타입 - 기본(default), 클릭됨(click), 비활성화(disabled)
type InputState = 'default' | 'click' | 'disabled';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  maxWidth?: string;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      width = '320px',
      maxWidth,
      disabled,
      name,
      type = 'text',
      style,
      className,
      onChange,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [state, setState] = useState<InputState>('default');

    // 포커스 시 상태를 'click'으로 변경
    const handleFocus = () => setState('click');

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setState('default');
      if (onBlur) onBlur(e);
    };

    const containerClass = clsx('flex flex-col items-start gap-2');

    const inputWrapperClass = clsx(
      'flex items-center transition-colors rounded-[4px] border w-full',
      {
        'text-[#CED6DD] bg-[#E9EEF2] border-gray-200 cursor-not-allowed': disabled,
        'text-black border-gray-500 bg-white': !disabled && state === 'click',
        'text-black border-gray-300 bg-white': !disabled && state === 'default',
      },
    );

    const inputClass = clsx(
      'w-full bg-transparent text-sm text-inherit outline-none border-none px-4 py-3',
    );

    return (
      <div className={containerClass} style={{ width, maxWidth, ...style }}>
        <div className={inputWrapperClass}>
          <input
            {...props}
            ref={ref}
            id={name}
            name={name}
            type={type}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={onChange}
            className={inputClass}
          />
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
