// sw.js - This file needs to be in the root of the directory to work,
//         so do not move it next to the other scripts

const CACHE_NAME = 'lab-7-starter';

// Once the service worker has been installed, feed it some initial URLs to cache
self.addEventListener('install', function (event) {
  /**
   * TODO - Part 2 Step 2
   * Create a function as outlined above
   */
   console.log('C');
  var urlsToCache = ['https://raw.githubusercontent.com/humanmanwhoisnotdead/Lab7_Starter/main/assets/scripts/main.js', 'https://raw.githubusercontent.com/humanmanwhoisnotdead/Lab7_Starter/main/assets/scripts/Router.js',
   'https://raw.githubusercontent.com/humanmanwhoisnotdead/Lab7_Starter/main/assets/components/RecipeCard.js','https://raw.githubusercontent.com/humanmanwhoisnotdead/Lab7_Starter/main/assets/components/RecipeExpand.js',
   'https://raw.githubusercontent.com/humanmanwhoisnotdead/Lab7_Starter/main/assets/styles/main.css', 'https://raw.githubusercontent.com/humanmanwhoisnotdead/Lab7_Starter/main/index.html'];
  event.waitUntil(
  caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
      console.log('F');
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
  console.log('X');
  event.waitUntil(clients.claim());
});

// Intercept fetch requests and store them in the cache
self.addEventListener('fetch', function (event) {
  /**
   * TODO - Part 2 Step 4
   * Create a function as outlined above
   */
  console.log('Y');
  console.log(caches.open(CACHE_NAME));
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        console.log('g');
        if (response) {
          console.log('h');
          console.log(response);
          return response;
        }

        console.log('v');
        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200) {
              console.log('z');
              console.log(response);
              return response;
            }
            console.log('b');

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();
            
            console.log('b');
            caches.open(CACHE_NAME)
              .then(function(cache) {
                console.log('c');
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});