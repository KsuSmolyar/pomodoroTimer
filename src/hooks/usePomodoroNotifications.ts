import { useEffect } from "react";

export const usePomodoroNotifications = (timeLeft: number) => {
    useEffect(() => {
        if (timeLeft === 0) {
            fetch("https://pomodoro-server-o7zu.onrender.com/notify", {
                method: "POST"
            }).catch(err => console.error("Notify error", err));

            const audio = new Audio("./beep.mp3");
            audio.play().catch(err => console.error("Ошибка при воспроизведении звука", err));
        }
    }, [timeLeft]);
}
