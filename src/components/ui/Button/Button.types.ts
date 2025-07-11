// src/components/ui/Button/Button.types.ts
import React from "react";

// 확장된 타입 정의
export type ButtonVariant = "primary" | "assistive";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps
extends React.ButtonHTMLAttributes < HTMLButtonElement > {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    isLoading?: boolean;
}