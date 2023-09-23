/// Precaching resources

const cacheName = 'cache-v1';
const resourcesToPrecache = [
    'index.html',
    'index.css',
    'index.js',
    'package.json',
    'site.webmanifest'
];


/// Basic service worker

self.addEventListener('install' ,event => {
    console.log('Service worker install event!');
    // Loading files into the cache
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(resourcesToPrecache);
            })
    );
});

self.addEventListener('activate' ,() => {
    console.log('Service worker activated');
});

// Responding with only cached resources

self.addEventListener('fetch' ,event => {
    // Cache-first
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    )
});

