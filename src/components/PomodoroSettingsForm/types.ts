export type SettingsField = {
    label: string,
    value: SettingsType
}

export const settings = {
    workDuration: "workDuration",
    shortBreak: "shortBreak",
    longBreak: "longBreak",
    cyclesBeforeLongBreak: "cyclesBeforeLongBreak"
} as const;

export type SettingsType = keyof typeof settings;


export type SettingsFormProps = {
    fieldsData: SettingsField[],
    onClose: () => void
}


export type PomodoroSettingsFieldProps =  {
    settingValue: SettingsType,
    label: string,
    formValue: number,
    onSettingsChange: (key: SettingsType, val: number) => void
}
