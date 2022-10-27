const tag = '1';
const prefix = 'KEYPAD';
const cacheName = `${prefix}-${tag}`;

const urls = [
  "/keypad/javascripts/index-ASQHXNQP.js.map",
  "/keypad/javascripts/index-ASQHXNQP.js",
  "/keypad/stylesheets/index-OKKCZN7F.css.map",
  "/keypad/stylesheets/index-OKKCZN7F.css",
  "/keypad/images/icon-152-72CTGGWN.png",
  "/keypad/images/icon-167-KPWCMVJQ.png",
  "/keypad/images/icon-180-2545OKH3.png",
  "/keypad/images/icon-192-5FJ3MFBM.png",
  "/keypad/images/icon-512-ERHS7VOQ.png",
  "/keypad/index.html",
  "/keypad/"
];

self.addEventListener('install', async (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => {
    return cache.addAll(urls);
  }))
})

const clearPreviousCaches = async () => {
  let keys = await caches.keys()
  keys = keys.filter((key) => {
    return (key != cacheName) && key.startsWith(prefix)
  })
  for (let key of keys) {
   await caches.delete(key);
  }
}

self.addEventListener('activate', (event) => {
  return event.waitUntil(clearPreviousCaches())
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(cacheName).then((cache) => {
      return cache.match(event.request, {ignoreSearch: true})
    }).then((response) => {
      return response || fetch(event.request)
    })
  )
})

self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
})
