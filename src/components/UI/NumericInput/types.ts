import type { InputHTMLAttributes } from "react"

export type NumericInputProps = InputHTMLAttributes<HTMLInputElement> & {
    // value: string,
    className?: string,
    onInputChange?: (value: string) => void
}
