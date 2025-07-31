import { useEffect } from "react"

export const useDebouncedEffect = (
    effect: () => void,
    deps: ReadonlyArray<unknown>,
    delay: number
) => {
    useEffect(() => {
        const handler = setTimeout(effect, delay);

        return () => clearTimeout(handler)
    },[...deps, delay])
}
