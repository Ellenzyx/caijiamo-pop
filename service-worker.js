/* Minimal offline cache for CAI JIA MO POP */
const CACHE_NAME = 'caijiamo-pop-v1';

const CORE_ASSETS = [
  './',
  './index.html',
  './menu.html',
  './style.css',
  './game.js',
  './menu.js',
  './manifest.webmanifest',
  './icons/icon.svg',
  './chengpincaijiamo/caijiamo1.png',
  './chengpincaijiamo/caijiamo2.png',
  './chengpincaijiamo/caijiamo3.png',
  './chengpincaijiamo/caijiamo4.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.map((k) => (k === CACHE_NAME ? Promise.resolve() : caches.delete(k))))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // 图片优先网络（更新快），离线回退缓存
  if (req.destination === 'image') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // 页面/脚本/样式：缓存优先，离线可靠
  event.respondWith(caches.match(req).then((cached) => cached || fetch(req)));
});

