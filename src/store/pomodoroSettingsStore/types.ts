export interface PomodoroSettings {
  workDuration: number;
  shortBreak: number;
  longBreak: number;
  cyclesBeforeLongBreak: number;
  autoStartNextMode: boolean;
}

export interface SettingsContextValue {
  settings: PomodoroSettings;
  setSettings: React.Dispatch<React.SetStateAction<PomodoroSettings>>;
}
