importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log('Workbox sukses dimuat');
else
  console.log('Workbox gagal dimuat');



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

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  workbox.strategies.staleWhileRevalidate({ 
      cacheName: "api-response",
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
