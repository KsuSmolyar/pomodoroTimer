import styles from "./PomodoroTimer.module.css";
import { usePomodoroTimerContext } from "../../store/pomodoroTimerStore/context";
import { PomodoroTimerControls } from "./PomodoroTimerControls";
import { modes } from "../../store/pomodoroTimerStore/types";
import { usePomodoroNotifications } from "../../hooks/usePomodoroNotifications";
import { usePomodoroTick } from "../../hooks/usePomodoroTick";
import { TimerDisplay } from "../TimerDisplay";
import { useMemo } from "react";
import { Stats } from "../Stats";
import { usePomodoroSettings } from "../../store/pomodoroSettingsStore/context";
import { useToggle } from "../../hooks/useToggle";
import { Button } from "../UI/Button";
import { PomodoroDurationSelector } from "../PomodoroDurationSelector";

export const PomodoroTimer = () => {
    const {store, actions } = usePomodoroTimerContext();
    const { settings } = usePomodoroSettings();
    const {value: isStatsVisible, toggle: toggleStatsVisible} = useToggle(false)

    usePomodoroTick(store.isRunning, () => actions.tick(settings));
    usePomodoroNotifications(store.timeLeft);

    const timeLeft = useMemo(() => {
        return store.timeLeft
    },[store.timeLeft])

    return (
        <div className={styles.timer}>
            <PomodoroDurationSelector/>
            <div className={styles.mode}>
                Режим: <span className={styles.title}>{store.mode === modes.work ? "Работа" : "Отдых"}</span>
            </div>
            <TimerDisplay timeLeft={timeLeft}/>
            <div className={styles.counter}>
                Количество завершенных циклов: <span className={styles.title}>{store.completedCycles}</span>
            </div>

            <PomodoroTimerControls/>
            <Button 
                label={isStatsVisible ? "📊 Скрыть статистику" : "📊 Показать статистику"}
                className={styles.statsToggler}
                onClick={toggleStatsVisible}
            />
            {isStatsVisible && <Stats />}
        </div>
    )
}
