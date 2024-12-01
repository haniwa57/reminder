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

// トークンを取得して表示
getToken(messaging, { vapidKey: 'YOUR_PUBLIC_VAPID_KEY' }).then(token => {
  if (token) {
    console.log('FCM Token:', token);
    // ここでサーバーにトークンを保存する場合は追加コードを記述
  } else {
    console.log('No registration token available. Request permission to generate one.');
  }
}).catch(err => {
  console.error('An error occurred while retrieving token. ', err);
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
