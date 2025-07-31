import { Button } from "../UI/Button"
import styles from "./PomodoroDurationSelector.module.css"
import type { PomodoroDurationControlsProps } from "./types"

export const PomodoroDurationControls = ({
    isVisible, 
    toggleVisible, 
    setIsSettingsOpen 
}: PomodoroDurationControlsProps) => {
    return (
        <div className={styles.container}>
            <Button 
                className={styles.controlBtn}
                label={isVisible ? <><span>📃</span><span>Выбор из вариантов</span></>  : <><span>✏️</span><span>Ввести вручную</span></>}
                onClick={toggleVisible}
            />
            <Button
                className={styles.controlBtn}
                label={<><span>⚙️</span><span>Настроить цикл</span></>}
                onClick={() => setIsSettingsOpen(true)}
            />
        </div>
    )
}
