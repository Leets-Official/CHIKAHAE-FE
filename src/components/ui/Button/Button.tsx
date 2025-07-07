// src/components/ui/Button/Button.tsx
// Tailwind로 배경, 색상, 크기만 기본적으로 처리하도록 먼저 만듭니다.

import React from "react";
import type { ButtonProps } from "./Button.types";
import { twMerge } from "tailwind-merge";

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "secondary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  disabled,
  className,
  ...props
}) => {
  const baseStyles = "rounded-lg font-semibold shadow transition-all duration-200";
  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  }[size];

  const variantStyles = {
    primary: "bg-blue-400 text-white hover:bg-blue-500",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
  }[variant];

  return (
    <button
      disabled={disabled || isLoading}
      className={twMerge(
        baseStyles,
        sizeStyles,
        variantStyles,
        fullWidth && "w-full",
        (disabled || isLoading) && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {isLoading ? "로딩중..." : children}
    </button>
  );
};

export default Button;