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
                className={styles.controlBtn}
                onClick={actions.toggle}
                label={store.isRunning ? <><span>⏸️</span><span>Пауза</span></> : <><span>▶️</span><span>Старт</span></>}
            />  
            <Button
                className={styles.controlBtn}
                onClick={actions.reset}
                label={<><span>⏲️</span><span>Сбросить таймер</span></>}
            />
            <Button 
                className={styles.controlBtn}
                onClick={actions.resetCyclesCounter}
                disabled={store.isRunning}
                label={<><span>🔢</span><span>Сбросить счетчик</span></> }
            />
            <Button
                onClick={() =>actions.skipBreak(settings)}
                className={classNames(styles.skipBreak, styles.controlBtn, {[styles.active]: store.mode === modes.break})}
                label={<><span>🔄️</span><span>Пропустить перерыв</span></>}
            />
        </div>
    )
}
