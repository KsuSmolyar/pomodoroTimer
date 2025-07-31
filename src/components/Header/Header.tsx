import { ThemeToggler } from "../ThemeToggler";
import styles from "./Header.module.css";

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1><span className={styles.icon}>🍅</span> Pomodoro Timer</h1>
                <ThemeToggler/>
            </div>
            
        </header>
    )
}
