self.addEventListener('push', function (event) {
    const data = event.data.json();

    self.registration.showNotification(data.notification.title, {
        body: data.notification.body,
        icon: '/profileImage.png',
    });
});

self.addEventListener('install', () => {
    self.skipWaiting();
});
self.addEventListener('activate', () => {
    clients.claim();
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                // 이미 열린 탭이 있으면 포커싱
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }

            // 아니면 새 창 열기
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});