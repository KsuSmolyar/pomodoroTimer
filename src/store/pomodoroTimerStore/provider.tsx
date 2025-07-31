import { useEffect, useReducer, useState, type ReactNode } from "react";
import { BREAK_TIME, POMODORO_HISTORY_KEY, POMODORO_STATE_KEY } from "../../constants";
import { modes, pomodoroTimerActions, type PomodoroState, type PomodoroTimerActions } from "./types";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { pomodoroTimerInitState } from "../../components/PomodoroTimer/mock";
import { PomodoroTimerContext } from "./context";
import { getDataFromLocalStorage } from "../../utils/getDataFromLocalStorage";
import type { PomodoroHistory } from "../../types";
import type { PomodoroSettings } from "../pomodoroSettingsStore/types";
import { usePomodoroSettings } from "../pomodoroSettingsStore/context";
import { useDebouncedEffect } from "../../hooks/useDebouncedEffect";


const reducer = (state: PomodoroState, action: PomodoroTimerActions) => {
    switch (action.type) {
        case pomodoroTimerActions.toggle: {
            return ({
                ...state,
                isRunning: !state.isRunning,
                lastUpdated: Date.now(),
            })
        }
        case pomodoroTimerActions.reset: {
            return resetTimer(state)
        }
        case pomodoroTimerActions.tick: {
            if (!state.isRunning) return state;

            const newTime = state.timeLeft - 1;
            if (newTime < 0) {
                return switchMode(state, action.payload)   
            }
            return ({
                ...state,
                timeLeft: newTime,
                lastUpdated: Date.now(),
            })
        }
        case pomodoroTimerActions.setDuration: {
            return setNewTime(state, action.payload)
        }
        case pomodoroTimerActions.resetCyclesCounter: {
            return ({
                ...resetTimer(state),
                mode: modes.work,
                completedCycles: 0
            })
        }
        case pomodoroTimerActions.setCustomTime: {
            const newTime = Math.max(action.payload * 60, 1);
            return setNewTime(state, newTime)
        }
        case pomodoroTimerActions.clearHistoryFlag:
            return {
                ...state,
                shouldAddHistory: false
            }
        case pomodoroTimerActions.applySettings: {
            const { workDuration, shortBreak, longBreak, cyclesBeforeLongBreak } = action.payload;
            let newTime = state.timeLeft;

            if (!state.isRunning && state.mode === modes.work) {
                newTime = workDuration * 60;
            }

            if (!state.isRunning && state.mode === modes.break) {
                const isLongBreak = state.completedCycles % cyclesBeforeLongBreak === 0;
                newTime = (isLongBreak ? longBreak : shortBreak) * 60;
            }

            return {
                ...state,
                timeLeft: newTime,
                initialTime: workDuration * 60,
                lastUpdated: Date.now()
            };
        }

        case pomodoroTimerActions.skipBreak: {
            const { workDuration, autoStartNextMode } = action.payload;
            return {
                ...state,
                completedCycles: state.completedCycles + 1,
                mode: modes.work,
                timeLeft: workDuration * 60,
                isRunning: autoStartNextMode,
                lastUpdated: Date.now(),
            };
        }
        default:
            return state
    }
}

export const PomodoroTimerProvider = ({children}: {children: ReactNode}) => {
    const initStore = () => {
        const localData = localStorage.getItem(POMODORO_STATE_KEY);
        const baseState = localData ? JSON.parse(localData) : pomodoroTimerInitState;

        // если таймер был запущен при прошлой сессии, пересчитаем оставшееся время
        if (baseState.isRunning) {
            const now = Date.now();
            const delta = Math.floor((now - baseState.lastUpdated) / 1000);
            const updatedTime = Math.max(baseState.timeLeft - delta, 0);

            return {
                ...baseState,
                timeLeft: updatedTime,
                isRunning: updatedTime > 0,
                lastUpdated: now,
            };
        }

        return baseState;
    }

    const [store, dispatch] = useReducer(reducer, pomodoroTimerInitState, initStore);

     const { settings } = usePomodoroSettings();

    const [, setSavedStore] = useLocalStorage<PomodoroState>(POMODORO_STATE_KEY, store);

    const [history, setHistory] = useState<PomodoroHistory[]>(
        () => getDataFromLocalStorage<PomodoroHistory[]>(POMODORO_HISTORY_KEY, [])
    );

    const actions = {
      toggle: () => dispatch({ type: pomodoroTimerActions.toggle }),
      reset: () => dispatch({ type: pomodoroTimerActions.reset }),
      tick: () => dispatch({ type: pomodoroTimerActions.tick, payload: settings }),
      setDuration: (duration: number) => dispatch({type: pomodoroTimerActions.setDuration, payload: duration}),
      resetCyclesCounter: () => dispatch({type: pomodoroTimerActions.resetCyclesCounter}),
      setCustomTime: (time: number) => dispatch({type: pomodoroTimerActions.setCustomTime, payload: time}),
      clearHistoryFlag: () => dispatch({type: pomodoroTimerActions.clearHistoryFlag}),
      applySettings: (settings: PomodoroSettings) => dispatch({ type: pomodoroTimerActions.applySettings, payload: settings }),
      skipBreak: (settings: PomodoroSettings) => dispatch({type: pomodoroTimerActions.skipBreak, payload: settings})
    }

    useDebouncedEffect(
        () => {
             if (store.isRunning) {
                setSavedStore(store)
             }
            },
        [store],
        5000
    )

    useEffect(() => {
        setSavedStore(store);
    }, [store.isRunning]);
    
    useEffect(() => {
    if (store.shouldAddHistory) {
        addSessionToHistory(store.initialTime, history, setHistory);

        dispatch({ type: pomodoroTimerActions.clearHistoryFlag });
    }
}, [store.shouldAddHistory, store.initialTime, history]);

    return (
        <PomodoroTimerContext.Provider value={{store, actions, history}}>
            {children}
        </PomodoroTimerContext.Provider>
    )
}

function switchMode(state: PomodoroState, settings: PomodoroSettings) {
    const now = Date.now();
    const isWorkFinished = state.mode === modes.work;
    
    const { shortBreak, longBreak, cyclesBeforeLongBreak, workDuration, autoStartNextMode } = settings;

    let nextMode = state.mode;
    let nextTime = state.timeLeft;
    let completedCycles = state.completedCycles;

    if(state.mode === modes.work) {
        nextMode = modes.break;
        nextTime = ((completedCycles - cyclesBeforeLongBreak === 0) ? longBreak : shortBreak) * 60;
    } else {
        completedCycles += 1;
        nextMode = modes.work;
        nextTime = workDuration * 60;
    }

    return {
        ...state,
        timeLeft: nextTime,
        isRunning: autoStartNextMode,
        lastUpdated: now,
        mode: nextMode,
        completedCycles,
        shouldAddHistory: isWorkFinished,
    };
}

function resetTimer(state: PomodoroState): PomodoroState {
    const now = Date.now();
    const newTime = state.mode === modes.work ? state.initialTime : BREAK_TIME;

    return {
        ...state,
        timeLeft: newTime,
        initialTime: state.initialTime,
        isRunning: false,
        lastUpdated: now,
    }
}

function setNewTime(state: PomodoroState, seconds: number): PomodoroState {
    const now = Date.now();

    return ({
        ...state,
        timeLeft: seconds,
        initialTime: seconds,
        isRunning: false,
        lastUpdated: now,
    })
}

function addSessionToHistory(
    duration: number,
    currentHistory: PomodoroHistory[],
    setHistory: React.Dispatch<React.SetStateAction<PomodoroHistory[]>>

) {
    const newHistory = [
        ...currentHistory,
        {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        duration
        }
    ];
    localStorage.setItem(POMODORO_HISTORY_KEY, JSON.stringify(newHistory));
    setHistory(newHistory);
}
