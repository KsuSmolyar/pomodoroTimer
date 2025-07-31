import './App.css'
import "./styles/palette.css"
import "./styles/vars.css"
import { PomodoroTimer } from './components/PomodoroTimer'
import { PomodoroTimerProvider } from './store/pomodoroTimerStore/provider'
import { Header } from './components/Header'
import { PomodoroSettingsProvider } from './store/pomodoroSettingsStore/provider'
import { useEffect } from 'react'
import { subscribeToPush } from './utils/subscribeToPush'

function App() {

  useEffect(() => {
    async function initPush() {
      // Проверяем статус разрешений
      const permissionState = Notification.permission;
      console.log("Notification.permission =", permissionState);

      const registration = await navigator.serviceWorker.ready;
      const existingSub = await registration.pushManager.getSubscription();
      console.log("Existing subscription:", existingSub);

      // Если разрешение сброшено или подписки нет — удаляем флаг
      if (permissionState !== "granted" || !existingSub) {
        localStorage.removeItem("pushSubscribed");
      }

      const alreadySubscribed = localStorage.getItem("pushSubscribed");
      if (alreadySubscribed) return; // если флаг и подписка есть, выходим

      // Спрашиваем разрешение у пользователя
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        await subscribeToPush();
        localStorage.setItem("pushSubscribed", "true");
      }
    }

    if ("Notification" in window && "serviceWorker" in navigator) {
      initPush();
    }
  }, []);


  return (
    <>
      <Header/>
      <main className={"mainContainer"}>
        <PomodoroSettingsProvider>
          <PomodoroTimerProvider>
            <PomodoroTimer/>
          </PomodoroTimerProvider>
        </PomodoroSettingsProvider>
      </main>
    </>
    
  )
}

export default App
