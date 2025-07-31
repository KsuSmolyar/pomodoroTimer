import { useEffect } from "react";

export const usePomodoroNotifications = (timeLeft: number) => {
    useEffect(() => {
        if (timeLeft === 0) {
            const subStr = localStorage.getItem('pushSubscription');
            if (subStr) {
                const sub = JSON.parse(subStr);
                const endpoint = sub.endpoint;

                // Отправляем только для этого endpoint
                fetch("https://pomodoro-server-o7zu.onrender.com/notify", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ endpoint }),
                }).catch(err => console.error("Notify error", err));
            }

            const audio = new Audio("./beep.mp3");
            audio.play().catch(err => console.error("Ошибка при воспроизведении звука", err));
        }
    }, [timeLeft]);
}
