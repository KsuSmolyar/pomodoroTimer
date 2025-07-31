import { useEffect } from "react";
import { ONE_SECOND } from "../constants";

export const usePomodoroTick = (isRunning: boolean, tick: () => void) => {
    useEffect(() => {
        if (!isRunning) return;
        
        const timer = setInterval(tick,ONE_SECOND)
        
        return () =>  clearInterval(timer)
    },[isRunning, tick])
}
