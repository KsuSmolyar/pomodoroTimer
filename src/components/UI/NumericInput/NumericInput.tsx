import classNames from "classnames";
import styles from "./NumericInput.module.css";
import type { NumericInputProps } from "./types";
import { forwardRef, type ChangeEvent } from "react";

export const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
    ({
    value,
    className,
    placeholder,
    onInputChange,
    disabled

}, ref) => {



    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        onInputChange?.(value);
    }

    return (
        <input
            ref={ref}
            className={classNames(styles.input, className)}
            type="tel"
            inputMode="numeric"
            pattern="\d*"
            maxLength={3}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
        />
    )
})
