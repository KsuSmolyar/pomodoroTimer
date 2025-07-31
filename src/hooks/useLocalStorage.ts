import { useEffect, useState } from "react";
import { getDataFromLocalStorage } from "../utils/getDataFromLocalStorage";

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
    const [value, setValue] = useState<T>(() => getDataFromLocalStorage(key, initialValue));

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (err) {
            console.warn(`Ошибка при записи данных в LocalStorage по ключу ${key}:`, err)
        }
    },[key, value])

    return [value, setValue] as const;
}
