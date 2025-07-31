import { createContext, useContext } from "react";
import type { SettingsContextValue } from "./types";

export const SettingsContext = createContext<SettingsContextValue | null>(null);

export const usePomodoroSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("usePomodoroSettings must be used within PomodoroSettingsProvider");
  return ctx;
};


