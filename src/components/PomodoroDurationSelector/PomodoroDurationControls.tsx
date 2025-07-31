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
                label={isVisible ? "📃 Выбор из вариантов" : "✏️ Ввести вручную"}
                onClick={toggleVisible}
            />
            <Button
                label={"⚙️ Настроить цикл"}
                onClick={() => setIsSettingsOpen(true)}
            />
        </div>
    )
}
