/* eslint-disable no-restricted-globals */
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache) {
        return cache.addAll([
            '/index.html',
            '/css/style.css',
            '/static/js/bundle.js',
            '/',
            '/about',
            '/users',
            '../src/i18n.js',
            '../src/App.js',
        ]);
        })
    );
    });

self.addEventListener('fetch', function(event) {
    if(!navigator.onLine){
        event.respondWith(
            caches.match(event.request).then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            let fetchRequest = event.request.clone();
            fetch(fetchRequest);
            }
        ));
    }
});