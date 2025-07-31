import type { PomodoroHistory } from "../../types";
import type { PomodoroSettings } from "../pomodoroSettingsStore/types";

export interface PomodoroState {
  timeLeft: number;
  isRunning: boolean;
  lastUpdated: number; // timestamp
  initialTime: number;
  mode: ModeType;
  completedCycles: number;
  shouldAddHistory: boolean;
}

export type PomodoroTimerContextValue = {
    store: PomodoroState,
    actions: {
      toggle: () => void;
      reset: () => void;
      tick: (settings: PomodoroSettings) => void;
      setDuration: (duration: number) => void;
      resetCyclesCounter: () => void;
      setCustomTime: (time: number) => void;
      clearHistoryFlag: () => void;
      applySettings: (settings: PomodoroSettings) => void,
      skipBreak: (settings: PomodoroSettings) => void
    },
    history: PomodoroHistory[];
}


export const pomodoroTimerActions = {
    toggle: "toggle",
    reset: "reset",
    tick: "tick",
    setDuration: "setDuration",
    resetCyclesCounter: "resetCyclesCounter",
    setCustomTime: "setCustomTime",
    clearHistoryFlag: "clearHistoryFlag",
    applySettings: "applySettings",
    skipBreak: "skipBreak"
} as const;

export type PomodoroTimerActions = 
{type: typeof pomodoroTimerActions.toggle} | 
{type: typeof pomodoroTimerActions.reset} |
{type: typeof pomodoroTimerActions.tick, payload: PomodoroSettings} |
{type: typeof pomodoroTimerActions.setDuration, payload: number } |
{type: typeof pomodoroTimerActions.resetCyclesCounter} |
{type: typeof pomodoroTimerActions.setCustomTime, payload: number} |
{type: typeof pomodoroTimerActions.clearHistoryFlag} |
{type: typeof pomodoroTimerActions.applySettings, payload: PomodoroSettings} |
{type: typeof pomodoroTimerActions.skipBreak, payload: PomodoroSettings}


export const modes = {
  work: "work",
  break: "break"
} as const;

export type ModeType = keyof typeof modes;

