import { useEffect } from "react";

export const usePomodoroNotifications = (timeLeft: number) => {
    useEffect(() => {
        if (timeLeft === 0) {
            const audio = new Audio("/beep.mp3");
            audio.play().catch(err => console.error("Ошибка при воспроизведении звука", err));
    
            if (Notification.permission === "granted") {
                new Notification("Pomodoro завершён!", {
                    body: "Время вышло! Сделай перерыв.",
                    icon: "/tomato.png" 
                });
            }
        }
    }, [timeLeft]);
}
