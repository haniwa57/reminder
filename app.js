// app.js
document.getElementById('reminder-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const text = document.getElementById('reminder-text').value;
  const time = new Date(document.getElementById('reminder-time').value).getTime();
  const now = new Date().getTime();

  if (time > now) {
    setTimeout(() => {
      showNotification(text);
    }, time - now);

    const listItem = document.createElement('li');
    listItem.textContent = `${text} at ${new Date(time).toLocaleString()}`;
    document.getElementById('reminder-list').appendChild(listItem);
  } else {
    alert('Set a future time for your reminder!');
  }
});

function showNotification(message) {
  if (Notification.permission === 'granted') {
    new Notification('Reminder', { body: message });
  } else {
    alert(`Reminder: ${message}`);
  }
}

if (Notification.permission !== 'granted') {
  Notification.requestPermission();
}
