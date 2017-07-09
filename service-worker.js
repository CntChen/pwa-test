/**
 * @author CntChen
 * @date 2017-07-06
 */

const PREFIX = 'PWATEST';
const HASH = '1.1.7';
const OFFLINE_CACHE = `${PREFIX}-${HASH}`;
const OFFLINE_FILES = [
  './',
  './index.html',
  './index.js',
  './cacheman.js',
  './style.css'
];

self.addEventListener('install', event => {
  console.log('[Service Worker] Install');
  console.log('[Service Worker] New Cache Name:', OFFLINE_CACHE);
  event.waitUntil(
    caches.open(OFFLINE_CACHE).then(cache => {
      console.log('[Service Worker] Cache App Shell');
      return cache.addAll(OFFLINE_FILES);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] activate')
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== OFFLINE_CACHE) {
          console.log('[Service Worker] Removing Old Cache:', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  console.log('[Service Woker] Fetch:', event.request.url);
  event.respondWith(
    caches.open(OFFLINE_CACHE).then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    })
  );
});
