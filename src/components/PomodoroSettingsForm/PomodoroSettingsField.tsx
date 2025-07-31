import styles from "./PomodoroSettingsForm .module.css";
import type { PomodoroSettingsFieldProps } from "./types";

export const PomodoroSettingsField = ({
    label,
    settingValue,
    formValue,
    onSettingsChange
}: PomodoroSettingsFieldProps) => {
    return (
        <label className={styles.label}>
            {label}
            <input
                type="number"
                min={1}
                value={formValue}
                onChange={e => onSettingsChange(settingValue, +e.target.value)}
            />
        </label>
    )
}
 