import React, { useState, forwardRef } from 'react';
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
      width,
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

    // 블러 시 상태를 'default'로 되돌리고 외부 onBlur가 있다면 호출
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setState('default');
      if (onBlur) onBlur(e);
    };

    let containerClass = 'flex items-center transition-colors bg-white rounded-[4px] border ';
    if (disabled) {
      containerClass += 'text-gray-400 border-gray-200 bg-gray-100 cursor-not-allowed ';
    } else if (state === 'click') {
      containerClass += 'text-black border-gray-500 ';
    } else {
      containerClass += 'text-black border-gray-300 ';
    }

    const inputClass =
      'w-full bg-transparent text-sm text-inherit outline-none border-none px-4 py-3';

    return (
      <div
        className={`${containerClass} ${className || ''}`}
        style={{
          width: width || '100%',
          maxWidth: maxWidth || 'none',
          ...style,
        }}
      >
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
    );
  },
);

// displayName 설정 (디버깅 시 컴포넌트 이름으로 표시)
Input.displayName = 'Input';

export default Input;
