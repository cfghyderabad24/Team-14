/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-restricted-globals */
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache) {
        return cache.addAll([
            '/index.html',
            '/global.css',
            '/src/routes/sections.jsx',
            '/src/app.jsx',
            '/src/theme/index.js',
            '/src/hooks/use-scroll-to-top.js',
            '/src/routes/sections.jsx',
            '/src/pages/app.jsx',
            '/src/pages/blog.jsx',
            '/src/pages/user.jsx',
            '/src/pages/login.jsx',
            '/src/pages/products.jsx',
            '/src/pages/page-not-found.jsx',
            '/src/pages/register.jsx',
            '/src/sections/ngo/view.jsx',
            '/src/sections/diss.jsx',
            '/src/sections/coursefile.jsx',
            '/src/sections/trustee/view.jsx',
            '/src/sections/volunteer/view.jsx',
            '/src/sections/alumininotification.jsx',
            '/src/sections/renewalform/renewal-view.jsx',
            '/src/sections/volunteerApproval/volunteerApproval.jsx',
            '/src/layouts/dashboard/index.jsx',
        ]);
        })
    );
    });

self.addEventListener('fetch', function(event) {
    if(!navigator.onLine){
        event.respondWith(
            // eslint-disable-next-line consistent-return
            caches.match(event.request).then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            // eslint-disable-next-line prefer-const
            let fetchRequest = event.request.clone();
            fetch(fetchRequest);
            }
        ));
    }
});