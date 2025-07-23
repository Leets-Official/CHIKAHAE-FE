// 푸시 알림 수신 이벤트 리스너
self.addEventListener('push', function (event) {
    const data = event.data.json();

    // 알림을 표시
    self.registration.showNotification(data.notification.title, {
        body: data.notification.body, // 알림 본문 텍스트
        icon: '/profileImage.png', // 알림에 표시할 아이콘
    });
});

// 서비스 워커 설치 시 이벤트
self.addEventListener('install', () => {
    self.skipWaiting();
});

// 서비스 워커 활성화 시 이벤트
self.addEventListener('activate', () => {
    clients.claim();
});

// 알림 클릭 시 이벤트 리스너
self.addEventListener('notificationclick', function (event) {
    console.log('[SW] 알림 클릭됨', event);
    event.notification.close(); // 알림 창 닫기

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                // 이미 열린 탭이 있으면 포커싱
                if ('focus' in client) {
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