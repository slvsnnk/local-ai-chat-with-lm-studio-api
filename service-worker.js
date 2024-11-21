const CACHE_NAME = 'local-ai-chat-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/bot.svg',
  '/bot-192.png',
  '/bot-512.png',
  '/manifest.json',
  '/src/main.tsx'
  // Fügen Sie hier weitere Ressourcen hinzu, die zwischengespeichert werden sollen
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});