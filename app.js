import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getMessaging, getToken, onMessage } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging.js';

// Firebaseの設定
const firebaseConfig = {
  apiKey: "AIzaSyBs9IfLAObuzcBkVPo7guQSHGzcW7ALQls",
  authDomain: "push-1cb3a.firebaseapp.com",
  projectId: "push-1cb3a",
  storageBucket: "push-1cb3a.appspot.com",
  messagingSenderId: "837094307527",
  appId: "1:837094307527:web:9787b7b5c91fc17d46b0e2"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
// トークンを取得
Notification.requestPermission().then(permission => {
  if (permission === 'granted') {
    getToken(messaging, { vapidKey: 'BMsPynC8o8oHa6iTTNTEGrs5iIP5HR2vFTX4HibvNakB2qcNy7PKSRZ3TaRix4ukLaHzDZ1TIZL4m8WFwOfUjW8' }).then(token => {
      console.log('FCM Token:', token);
    });
  }
});

// リマインダーを保存する配列
let reminders = [];

// リマインダーのリストを更新
function updateReminderList() {
  const reminderList = document.getElementById('reminder-list');
  reminderList.innerHTML = '';

  reminders.forEach((reminder, index) => {
    const li = document.createElement('li');
    li.textContent = `${reminder.title} - ${new Date(reminder.time).toLocaleString()}`;
    reminderList.appendChild(li);
  });
}

// リマインダー通知をスケジュール
function scheduleReminder(reminder) {
  const now = Date.now();
  const timeDifference = new Date(reminder.time).getTime() - now;

  if (timeDifference > 0) {
    setTimeout(() => {
      new Notification(reminder.title, {
        body: `It's time for: ${reminder.title}`,
        icon: 'icon-192x192.png'
      });
    }, timeDifference);
  }
}

// フォーム送信時の処理
document.getElementById('reminder-form').addEventListener('submit', event => {
  event.preventDefault();

  const title = document.getElementById('reminder-title').value;
  const time = document.getElementById('reminder-time').value;

  if (!title || !time) {
    alert('Please provide a title and time for the reminder.');
    return;
  }

  const reminder = { title, time };
  reminders.push(reminder);
  updateReminderList();
  scheduleReminder(reminder);

  // フォームをリセット
  document.getElementById('reminder-form').reset();
});

// 通知を受信したときの処理
onMessage(messaging, payload => {
  console.log('Message received. ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'icon-192x192.png'
  };
  new Notification(notificationTitle, notificationOptions);
});
