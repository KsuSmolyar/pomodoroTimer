import classNames from "classnames";
import styles from "./Button.module.css";
import { buttonVariants, type ButtonProps } from "./types";
import { memo } from "react";

export const Button  = memo(({
    className,
    label,
    iconLeft,
    iconRight,
    variant = buttonVariants.primary,
    onClick,
    disabled
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={classNames(styles.button, className, {
                [styles.primary]: variant === buttonVariants.primary,
                [styles.secondary]: variant === buttonVariants.secondary
            })}
        >
            {!!iconLeft && <span>{iconLeft}</span>}
            {label}
            {!!iconRight && <span>{iconRight}</span>}
        </button>
    )
})
