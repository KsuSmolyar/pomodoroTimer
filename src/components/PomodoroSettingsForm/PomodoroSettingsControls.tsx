import { Button } from "../UI/Button";
import styles from "./PomodoroSettingsForm .module.css";
import type { SettingsFormProps } from "./types";

export const PomodoroSettingsControls = ({onClose}: Pick<SettingsFormProps, 'onClose'>) => {
    return (
        <div className={styles.controls}>
            <Button label="Отменить" onClick={onClose}/>
            <Button type="submit" label="Сохранить" variant="secondary"/>
        </div>
    )
}
