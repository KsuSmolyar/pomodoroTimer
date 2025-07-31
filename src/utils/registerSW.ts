export function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(`${import.meta.env.BASE_URL}sw.js`)
        .then(reg => console.log('SW registered', reg))
        .catch(err => console.log('SW registration failed:', err));
    });
  }
}
