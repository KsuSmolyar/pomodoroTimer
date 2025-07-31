import classNames from "classnames";
import { usePomodoroSettings } from "../../store/pomodoroSettingsStore/context";
import { usePomodoroTimerContext } from "../../store/pomodoroTimerStore/context";
import { modes } from "../../store/pomodoroTimerStore/types";
import styles from "./PomodoroTimer.module.css";
import { Button } from "../UI/Button";

export const PomodoroTimerControls = () => {
    const {store, actions} = usePomodoroTimerContext();
    const {settings} = usePomodoroSettings();

    return (
        <div className={styles.controls}>
            <Button
                onClick={actions.toggle}
                label={store.isRunning ? "⏸️ Пауза" : "▶️ Старт"}
            />  
            <Button
                onClick={actions.reset}
                label={"⏲️ Сбросить таймер"}
            />
            <Button 
                onClick={actions.resetCyclesCounter}
                disabled={store.isRunning}
                label={"🔢 Сбросить счетчик"}
            />
            <Button
                onClick={() =>actions.skipBreak(settings)}
                className={classNames(styles.skipBreak, {[styles.active]: store.mode === modes.break})}
                label={"🔄️ Пропустить перерыв"}
            />
        </div>
    )
}
