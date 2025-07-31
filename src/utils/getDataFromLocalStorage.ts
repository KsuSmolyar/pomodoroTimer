export const getDataFromLocalStorage = <T>(key: string, initialValue: T) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : initialValue;
    } catch (err) {
        console.warn(`Произошла ошибка при чтении данных из LocalStorage по ключу ${key}:`, err);
        return initialValue
    } 
}
