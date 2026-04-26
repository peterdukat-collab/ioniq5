const CACHE_NAME = "ioniq5-pwa-v1";

 

const FILES_TO_CACHE = [

  "./",

  "./index.html",

  "./manifest.json",

  "./background.jpg",

  "./ioniq5-blue.png",

  "./icon-192.png",

  "./icon-512.png"

];

 

// Install

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)

      .then(cache => cache.addAll(FILES_TO_CACHE))

  );

});

 

// Activate

self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys =>

      Promise.all(

        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))

      )

    )

  );

});

 

// Fetch

self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)

      .then(response => response || fetch(event.request))

  );

});