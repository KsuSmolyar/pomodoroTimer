import { DURATIONS } from "../../constants"
import { usePomodoroTimerContext } from "../../store/pomodoroTimerStore/context";
import { Button } from "../UI/Button"
import { buttonVariants } from "../UI/Button/types";
import styles from "./PomodoroDurationSelector.module.css"

export const PomodoroDurationSelectorItems = () => {
    const {store, actions} = usePomodoroTimerContext();

    return (
        <div className={styles.controls}>
            {DURATIONS.map((duration, index) => {
                return (
                    <Button
                        className={styles.durationBtn}
                        key={index}
                        label={`${duration} min`}
                        onClick={() => actions.setDuration(duration * 60)}
                        disabled={store.isRunning}
                        variant={
                            store.initialTime === duration * 60 
                            ? buttonVariants.secondary 
                            : buttonVariants.primary}
                    />
                )
            })}
        </div>
    )
}
