export const themeModes = {
    dark: "dark",
    light: "light"
} as const;

export type ThemeModes = keyof typeof themeModes;
