// sw.js - This file needs to be in the root of the directory to work,
//         so do not move it next to the other scripts

const CACHE_NAME = 'lab-7-starter';

// Once the service worker has been installed, feed it some initial URLs to cache
self.addEventListener('install', function (event) {
  /**
   * TODO - Part 2 Step 2
   * Create a function as outlined above
   */
  var urlsToCache = ['https://raw.githubusercontent.com/humanmanwhoisnotdead/Lab7_Starter/main/assets/scripts/main.js', 'https://raw.githubusercontent.com/humanmanwhoisnotdead/Lab7_Starter/main/assets/scripts/Router.js',
   'https://raw.githubusercontent.com/humanmanwhoisnotdead/Lab7_Starter/main/assets/components/RecipeCard.js','https://raw.githubusercontent.com/humanmanwhoisnotdead/Lab7_Starter/main/assets/components/RecipeExpand.js',
   'https://raw.githubusercontent.com/humanmanwhoisnotdead/Lab7_Starter/main/assets/styles/main.css', 'https://raw.githubusercontent.com/humanmanwhoisnotdead/Lab7_Starter/main/index.html'];
  event.waitUntil(
  caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

/**
 * Once the service worker 'activates', this makes it so clients loaded
 * in the same scope do not need to be reloaded before their fetches will
 * go through this service worker
 */
self.addEventListener('activate', function (event) {
  /**
   * TODO - Part 2 Step 3
   * Create a function as outlined above, it should be one line
   */
  clients.claim();
});

// Intercept fetch requests and store them in the cache
self.addEventListener('fetch', function (event) {
  /**
   * TODO - Part 2 Step 4
   * Create a function as outlined above
   */
  console.log('Y');
  console.log(caches);
  caches.match(event.request)
    .then(function(response) {
      if (response) {
        return response;
      }

      return fetch(event.request).then(
        function(response) {
          // Check if we received a valid response
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone response
          var responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });

          return response;
        }
      );
    })
});