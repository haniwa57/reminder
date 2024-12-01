// service-worker.js
self.addEventListener('push', function (event) {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: 'icon.png',
  });
});

// app.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(function (registration) {
    console.log('Service Worker registered with scope:', registration.scope);
  });
}
