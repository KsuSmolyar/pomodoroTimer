import { useState } from "react";
import styles from "./PomodoroDurationSelector.module.css";
import { Modal } from "../Modal";
import { settingsFields } from "../PomodoroSettingsForm/mock";
import { useToggle } from "../../hooks/useToggle";
import { PomodoroDurationControls } from "./PomodoroDurationControls";
import { PomodoroDurationSelectorItems } from "./PomodoroDurationSelectorItems";
import { PomodoroDurationInput } from "./PomodoroDurationInput";
import { PomodoroSettingsForm } from "../PomodoroSettingsForm";

export const PomodoroDurationSelector = () => {
    const {value: isVisible, toggle: toggleVisible, setValue: setIsVisible} = useToggle(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
    return (
        <div className={styles.selector}>
            <span>Установите желаемое время: </span>
            {isVisible ? 
                <PomodoroDurationInput setIsModalVisible={setIsVisible}/> :
                <PomodoroDurationSelectorItems/>
            }
            <PomodoroDurationControls isVisible={isVisible} setIsSettingsOpen={setIsSettingsOpen} toggleVisible={toggleVisible}/>
             
            {isSettingsOpen && (
                <Modal onClose={() => setIsSettingsOpen(false)}>
                    <PomodoroSettingsForm fieldsData={settingsFields} onClose={() => setIsSettingsOpen(false)} />
                </Modal>
            )}
            
        </div>
    )
}
