const CACHE_NAME = "secondpwa-v3";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/article.html",
  "/pages/home.html",
  "/pages/about.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/manifest.json",
  "/js/api.js",
  "/js/nav.js",
  "/js/db.js",
  "/js/sw-register.js",
  "/js/notifikasi.js",
  "/js/idb.js",
  "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;1,700&display=swap",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "/img/favicon-16.png",
  "/img/favicon-32.png",
  "/img/banner.png",
  "/img/icon-192x192.png",
  "/img/icon-256x256.png",
  "/img/icon-384x384.png",
  "/img/icon-512x512.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  var base_url = "https://api.football-data.org/v2/";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function (response) {
        return response || fetch(event.request);
      })
    )
  }
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
