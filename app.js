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

// 通知の許可をリクエスト
document.getElementById('enable-notifications').addEventListener('click', () => {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // トークンを取得
      getToken(messaging, { vapidKey: 'BMsPynC8o8oHa6iTTNTEGrs5iIP5HR2vFTX4HibvNakB2qcNy7PKSRZ3TaRix4ukLaHzDZ1TIZL4m8WFwOfUjW8' }).then(token => {
        if (token) {
          console.log('FCM Token:', token);
          alert('Token acquired! Check the console for details.');
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch(err => {
        console.error('An error occurred while retrieving token. ', err);
      });
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
});

// フォアグラウンドで通知を受信
onMessage(messaging, payload => {
  console.log('Message received. ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'icon-192x192.png'
  };
  new Notification(notificationTitle, notificationOptions);
});
