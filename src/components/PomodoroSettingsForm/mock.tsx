import { settings, type SettingsField } from "./types";

export const settingsFields: SettingsField[] = [
    {
        label: "Работа (мин)",
        value: settings.workDuration,
    },
    {
        label: "Короткий перерыв (мин)",
        value: settings.shortBreak
    },
    {
        label: "Длинный перерыв (мин)",
        value: settings.longBreak
    },
    {
        label: "Циклов до длинного перерыва",
        value: settings.cyclesBeforeLongBreak
    }
]
