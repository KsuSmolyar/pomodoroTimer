export async function subscribeToPush() {
  if (!('serviceWorker' in navigator)) return;

  const registration = await navigator.serviceWorker.ready;

  // Ваш публичный ключ VAPID (тот, что на сервере)
  const publicVapidKey = 'BM8n9S3709gqIbfpd_Rwh00LhuwJMIDqdgJAQXeXjdkuyfvIKYcUbO5U8gkILE3w3reZZY1u_K9ksq_UUDVM6Qc';

  // Попробуем подписаться
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  console.log('Подписка получена:', subscription);
  // сохраняем локально
  localStorage.setItem('pushSubscription', JSON.stringify(subscription));

  // const serverUrl =
  //   import.meta.env.MODE === "development"
  //     ? "http://localhost:4000"
  //     : "";

  // Отправляем подписку на сервер (POST /subscribe)
  await fetch(`https://pomodoro-server-o7zu.onrender.com/subscribe`, {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// Помощник для конвертации ключа
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
