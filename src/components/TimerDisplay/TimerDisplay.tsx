import { memo } from "react";
import { getFormattedTime } from "../../utils/getFormattedTime";
import styles from "./TimerDisplay.module.css";
import type { ITimerDisplayProps } from "./types";

export const TimerDisplay = memo(({timeLeft}: ITimerDisplayProps) => {
    return (
        <div className={styles.time}>{getFormattedTime(timeLeft)}</div>
    )
})
