import { useEffect, useState } from "react";
import styles from "./ThemeToggler.module.css";
import { themeModes, type ThemeModes } from "./types";
import { THEME_MODE_KEY } from "../../constants";
import { getTheme } from "../../utils/getTheme";

export const ThemeToggler = () => {
    const [theme, setTheme] = useState<ThemeModes>(getTheme);

    const handleChangeTheme = () => {
        if(theme === themeModes.dark) {
            setTheme(themeModes.light)
        } else {
            setTheme(themeModes.dark)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
        if(e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleChangeTheme();
        }
    }

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        localStorage.setItem(THEME_MODE_KEY, theme)
    }, [theme])

    return (
        <label 
            className={styles.label} 
            aria-label="Сменить тему" 
            title="Сменить тему"
            role="switch"
            aria-checked={theme === themeModes.dark}
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <input
                type="checkbox"
                name="themeInput"
                checked={theme === themeModes.dark}
                className={styles.input}
                onChange={handleChangeTheme}
                readOnly
            />
            <span className={styles.slider}/>
            <span className={styles.wave}/>
        </label>
    )
}
