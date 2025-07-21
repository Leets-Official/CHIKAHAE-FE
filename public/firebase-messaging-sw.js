self.addEventListener('push', function (event) {
    const data = event.data.json();

    self.registration.showNotification(data.notification.title, {
        body: data.notification.body,
        icon: '/profileImage.png',
    });
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    // 알림 클릭 시 홈페이지로 이동 
    event.waitUntil(clients.openWindow('/')); //FIXME: 수정 예정
});