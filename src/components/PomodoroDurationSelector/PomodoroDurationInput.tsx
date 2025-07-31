import { useEffect, useRef, useState } from "react";
import { usePomodoroTimerContext } from "../../store/pomodoroTimerStore/context";
import { Button } from "../UI/Button"
import { NumericInput } from "../UI/NumericInput"
import styles from "./PomodoroDurationSelector.module.css"
import type { PomodoroDurationInputProps } from "./types";

export const PomodoroDurationInput = ({
    setIsModalVisible

}: PomodoroDurationInputProps) => {
    const {store, actions} = usePomodoroTimerContext();
    const [inputValue, setInputValue] = useState("");
    const numericInputRef = useRef<HTMLInputElement | null>(null)

    const applyCustomTime = () => {
        const value = parseInt(inputValue, 10);
        if (!isNaN(value) && value > 0) {
            actions.setCustomTime(value);
            setInputValue("");
            setIsModalVisible(false);
        }
    };

     const handleNumericInputChange = (value: string) => {
        setInputValue(value);
    }

      useEffect(() => {
            if(numericInputRef.current) {
                numericInputRef.current.focus()
            }
        },[])

    return (
        <div className={styles.customInput}>
            <NumericInput
                ref={numericInputRef}
                value={inputValue}
                onInputChange={(val) => handleNumericInputChange(val)}
                disabled={store.isRunning}
            />
            <Button 
                label="Установить"
                onClick={applyCustomTime}
                disabled={!inputValue.length || store.isRunning}
            />
        </div>
    )
}
