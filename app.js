// サービスワーカーの登録
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(registration => {
    console.log('Service Worker registered:', registration.scope);
  }).catch(error => {
    console.error('Service Worker registration failed:', error);
  });
}

// 通知の許可をリクエスト
if ('Notification' in window) {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    } else {
      console.log('Notification permission denied.');
    }
  });
}

// リマインダーを管理する要素
const reminderForm = document.getElementById('reminder-form');
const reminderText = document.getElementById('reminder-text');
const reminderTime = document.getElementById('reminder-time');
const reminderList = document.getElementById('reminder-list');

// リマインダーの設定
reminderForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const text = reminderText.value;
  const time = new Date(reminderTime.value).getTime();
  const now = new Date().getTime();

  if (time > now) {
    const timeout = time - now;

    // リマインダーをローカルでスケジュール
    setTimeout(() => {
      showNotification(text);
    }, timeout);

    // リマインダーをリストに表示
    const listItem = document.createElement('li');
    listItem.textContent = `${text} at ${new Date(time).toLocaleString()}`;
    reminderList.appendChild(listItem);

    // フォームのリセット
    reminderForm.reset();
  } else {
    alert('Set a future time for your reminder!');
  }
});

// 通知を表示する関数
function showNotification(message) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Reminder', {
      body: message,
      icon: 'icon-192x192.png',
    });
  } else {
    alert(`Reminder: ${message}`);
  }
}
