import { themeModes, type ThemeModes } from "../components/ThemeToggler/types";
import { THEME_MODE_KEY } from "../constants";

export const getTheme = () => {
    if(typeof window === 'undefined') return themeModes.dark;

    const theme = window?.localStorage?.getItem(THEME_MODE_KEY) as ThemeModes;

    if(Object.values(themeModes).includes(theme)) return theme;

    const userMedia = window.matchMedia('(prefers-color-scheme: light)');

    if(userMedia.matches) return themeModes.light

    return themeModes.dark
}
