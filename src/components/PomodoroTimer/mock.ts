import { DEFAULT_TIME } from "../../constants";
import { modes } from "../../store/pomodoroTimerStore/types";

export const pomodoroTimerInitState = {
    timeLeft: DEFAULT_TIME,
    isRunning: false,
    lastUpdated: Date.now(),
    initialTime: DEFAULT_TIME,
    mode: modes.work,
    completedCycles: 0,
    shouldAddHistory: false
}
