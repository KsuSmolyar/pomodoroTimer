import { POMODORO_SETTINGS_KEY } from "../../constants";
import { defaultSettings } from "./mock";
import { SettingsContext } from "./context";
import { useLocalStorage } from "../../hooks/useLocalStorage";



export const PomodoroSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useLocalStorage(POMODORO_SETTINGS_KEY, defaultSettings);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
