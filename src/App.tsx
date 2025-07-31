import './App.css'
import "./styles/palette.css"
import "./styles/vars.css"
import { PomodoroTimer } from './components/PomodoroTimer'
import { PomodoroTimerProvider } from './store/pomodoroTimerStore/provider'
import { Header } from './components/Header'
import { PomodoroSettingsProvider } from './store/pomodoroSettingsStore/provider'

function App() {

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
