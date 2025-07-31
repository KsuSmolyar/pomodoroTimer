import type { ButtonHTMLAttributes, ReactNode } from "react";

export const buttonVariants = {
    primary: "primary",
    secondary: "secondary"
} as const;

export type ButtonVariantType = keyof typeof buttonVariants;
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string,
    label: ReactNode,
    iconLeft?: ReactNode,
    iconRight?: ReactNode,
    variant?: ButtonVariantType,
    onClick?: () => void,
}
