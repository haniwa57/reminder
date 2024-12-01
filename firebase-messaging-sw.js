// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging.js');

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
firebase.initializeApp(firebaseConfig);

// Messagingを設定
const messaging = firebase.messaging();

// プッシュ通知を受信したときの処理
messaging.onBackgroundMessage(payload => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'icon-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
