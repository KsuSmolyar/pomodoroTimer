export function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(`/pomodoroTimer/sw.js`)
        .then(reg => console.log('SW registered', reg))
        .catch(err => console.log('SW registration failed:', err));
    });
  }
}
