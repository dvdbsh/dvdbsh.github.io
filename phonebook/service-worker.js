const CACHE_NAME = 'partners-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  'https://unpkg.com/feather-icons@4.28.0',
  'https://api.dicebear.com/6.x/thumbs/svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
