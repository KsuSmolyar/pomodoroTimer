import { createContext, useContext } from "react";
import type { PomodoroTimerContextValue } from "./types";
import { pomodoroTimerInitState } from "../../components/PomodoroTimer/mock";

export const PomodoroTimerContext = createContext<PomodoroTimerContextValue>({
    store: pomodoroTimerInitState,
    actions: { 
        toggle: () => {}, 
        reset:()=> {}, 
        tick: () => {},  
        setDuration: () => {}, 
        resetCyclesCounter: () => {}, 
        setCustomTime: () => {},
        clearHistoryFlag: () => {},
        applySettings: () => {},
        skipBreak: () => {}
    },
        
    history: []
})


export const usePomodoroTimerContext = () => {
    const context = useContext(PomodoroTimerContext);
    return context;
}
