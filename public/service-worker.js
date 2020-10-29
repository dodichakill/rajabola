importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log('Workbox sukses dimuat');
else
  console.log('Workbox gagal dimuat');


// service worker baru
workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '1' },  
  { url: "/", revision: '1' },
  { url: "/nav.html", revision: '1' },
  { url: "/index.html", revision: '1' },
  { url: "/article.html", revision: '1' },
  { url: "/pages/home.html", revision: '1' },
  { url: "/pages/about.html", revision: '1' },
  { url: "/css/materialize.min.css", revision: '1' },
  { url: "/css/style.css", revision: '2' },
  { url: "/js/materialize.min.js", revision: '1' },
  { url: "/manifest.json", revision: '1' },
  { url: "/js/api.js", revision: '1' },
  { url: "/js/nav.js", revision: '1' },
  { url: "/js/db.js", revision: '1' },
  { url: "/js/sw-register.js", revision: '1' },
  { url: "/js/notifikasi.js", revision: '1' },
  { url: "/push.js", revision: '1' },
  { url: "/js/idb.js", revision: '1' },
  { url: "/img/favicon-32.png", revision: '1' },
  { url: "/img/profile.jpeg", revision: '1' },
  { url: "/img/banner.jpg", revision: '1' },
  { url: "/img/icon-192x192.png", revision: '1' },
  { url: "/img/icon-256x256.png", revision: '1' },
  { url: "/img/icon-384x384.png", revision: '1' },
  { url: "/img/apple-192x192.jpg", revision: '1' },
  { url: "/img/icon-512x512.png", revision: '1' }
]);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages'
  })
);


self.addEventListener('push', event => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  const options = {
    body: body,
    icon: 'img/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});

//service worker lama
// const CACHE_NAME = "secondpwa-v3.5.0";
// const urlsToCache = [
//   "/",
//   "/nav.html",
//   "/index.html",
//   "/article.html",
//   "/pages/home.html",
//   "/pages/about.html",
//   "/css/materialize.min.css",
//   "/css/style.css",
//   "/js/materialize.min.js",
//   "/manifest.json",
//   "/js/api.js",
//   "/js/nav.js",
//   "/js/db.js",
//   "/js/sw-register.js",
//   "/js/notifikasi.js",
//   "/push.js",
//   "/js/idb.js",
//   "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;1,700&display=swap",
//   "https://fonts.googleapis.com/icon?family=Material+Icons",
//   "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
//   "https://fonts.gstatic.com/s/montserrat/v15/JTUPjIg1_i6t8kCHKm459WxZcgvz8fZwnCo.woff2",
//   "https://fonts.gstatic.com/s/montserrat/v15/JTUPjIg1_i6t8kCHKm459WxZcgvz-PZwnCo.woff2",
//   "https://fonts.gstatic.com/s/montserrat/v15/JTUPjIg1_i6t8kCHKm459WxZcgvz8_ZwnCo.woff2",
//   "https://fonts.gstatic.com/s/montserrat/v15/JTUPjIg1_i6t8kCHKm459WxZcgvz8vZwnCo.woff2",
//   "https://fonts.gstatic.com/s/montserrat/v15/JTUPjIg1_i6t8kCHKm459WxZcgvz_PZw.woff2",
//   "https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459WRhyzbi.woff2",
//   "https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459W1hyzbi.woff2",
//   "https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459WZhyzbi.woff2",
//   "https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459Wdhyzbi.woff2",
//   "https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2",
//   "/img/favicon-32.png",
//   "/img/profile.jpeg",
//   "/img/banner.jpg",
//   "/img/icon-192x192.png",
//   "/img/icon-256x256.png",
//   "/img/icon-384x384.png",
//   "/img/icon-512x512.png"
// ];

// self.addEventListener("install", event => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then( cache => {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener("fetch", event => {
//   const base_url = "https://api.football-data.org/v2/";

//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then( cache => {
//         return fetch(event.request).then( response => {
//           cache.put(event.request.url, response.clone());
//           return response;
//         })
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request, { ignoreSearch: true }).then( response => {
//         return response || fetch(event.request);
//       })
//     )
//   }
// });

// self.addEventListener("activate", event => {
//   event.waitUntil(
//     caches.keys().then( cacheNames => {
//       return Promise.all(
//         cacheNames.map( cacheName => {
//           if (cacheName != CACHE_NAME) {
//             console.log("ServiceWorker: cache " + cacheName + " dihapus");
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });
