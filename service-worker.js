if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
        console.log('Service Worker registriert mit Scope:', registration.scope);
    })
    .catch(error => {
        console.log('Service Worker Registrierung fehlgeschlagen:', error);
    });
}
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('my-cache').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/script.js',
                '/images/logo.png'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('fetch', event => {
  const wlanTestUrl = '/test_fetch';

  if (event.request.url === wlanTestUrl) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.ok) {
            self.clients.matchAll().then(clients => {
            clients.forEach(client => {
              client.postMessage('Connected to desired WLAN');
            });
          }
        })
        .catch(() => {
          self.clients.matchAll().then(clients => {
            clients.forEach(client => {
              client.postMessage('Connected to desired WLAN');
		  })
		  });
        });
    );
  } else {
	//standard behavior: first fetch or get cached version
     event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
  }
});