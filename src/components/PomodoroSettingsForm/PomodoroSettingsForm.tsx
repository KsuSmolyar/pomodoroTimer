import { useState } from "react";
import styles from "./PomodoroSettingsForm .module.css";
import type { SettingsFormProps, SettingsType } from "./types";
import { usePomodoroSettings } from "../../store/pomodoroSettingsStore/context";
import { PomodoroSettingsControls } from "./PomodoroSettingsControls";
import { PomodoroSettingsField } from "./PomodoroSettingsField";
import { usePomodoroTimerContext } from "../../store/pomodoroTimerStore/context";

export const PomodoroSettingsForm = ({fieldsData, onClose}: SettingsFormProps) => {
    const { settings, setSettings } = usePomodoroSettings();
    const [localSettings, setLocalSettings] = useState(settings);
    const { actions } = usePomodoroTimerContext();

    const handleChange = (setting: SettingsType, val: number) => {
        
        setLocalSettings((prev) => ({
            ...prev,
            [setting]: isNaN(val) ? 0 : val,
        }));
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setLocalSettings((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSettings(localSettings);
        actions.applySettings(localSettings);
        actions.setDuration(localSettings.workDuration * 60);
        actions.resetCyclesCounter();
        
        onClose();
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {fieldsData.map((field, index) => {
                return (
                    <PomodoroSettingsField 
                        key={index}
                        formValue={localSettings[field.value]}
                        label={field.label}
                        onSettingsChange={handleChange}
                        settingValue={field.value}
                    />
                )
            })}
            <label className={styles.checkboxRow}>
                <input
                type="checkbox"
                name={"autoStartNextMode"}
                checked={localSettings.autoStartNextMode}
                onChange={handleCheckboxChange}
                />
                Автоматически запускать следующий режим
            </label>
            <PomodoroSettingsControls onClose={onClose} />
        </form>
    )
}
