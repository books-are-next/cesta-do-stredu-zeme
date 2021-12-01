/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-9cdc338';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./cesta_do_stredu_zeme_split_002.html","./cesta_do_stredu_zeme_split_003.html","./cesta_do_stredu_zeme_split_004.html","./cesta_do_stredu_zeme_split_005.html","./cesta_do_stredu_zeme_split_006.html","./cesta_do_stredu_zeme_split_007.html","./cesta_do_stredu_zeme_split_008.html","./cesta_do_stredu_zeme_split_009.html","./cesta_do_stredu_zeme_split_010.html","./cesta_do_stredu_zeme_split_011.html","./cesta_do_stredu_zeme_split_012.html","./cesta_do_stredu_zeme_split_013.html","./cesta_do_stredu_zeme_split_014.html","./cesta_do_stredu_zeme_split_015.html","./cesta_do_stredu_zeme_split_016.html","./cesta_do_stredu_zeme_split_017.html","./cesta_do_stredu_zeme_split_018.html","./cesta_do_stredu_zeme_split_019.html","./cesta_do_stredu_zeme_split_020.html","./cesta_do_stredu_zeme_split_021.html","./cesta_do_stredu_zeme_split_022.html","./cesta_do_stredu_zeme_split_023.html","./cesta_do_stredu_zeme_split_024.html","./cesta_do_stredu_zeme_split_025.html","./cesta_do_stredu_zeme_split_026.html","./cesta_do_stredu_zeme_split_027.html","./cesta_do_stredu_zeme_split_028.html","./cesta_do_stredu_zeme_split_029.html","./cesta_do_stredu_zeme_split_030.html","./cesta_do_stredu_zeme_split_031.html","./cesta_do_stredu_zeme_split_032.html","./cesta_do_stredu_zeme_split_033.html","./cesta_do_stredu_zeme_split_034.html","./cesta_do_stredu_zeme_split_035.html","./cesta_do_stredu_zeme_split_036.html","./cesta_do_stredu_zeme_split_037.html","./cesta_do_stredu_zeme_split_038.html","./cesta_do_stredu_zeme_split_039.html","./cesta_do_stredu_zeme_split_040.html","./cesta_do_stredu_zeme_split_041.html","./cesta_do_stredu_zeme_split_042.html","./cesta_do_stredu_zeme_split_043.html","./cesta_do_stredu_zeme_split_044.html","./cesta_do_stredu_zeme_split_045.html","./cesta_do_stredu_zeme_split_046.html","./cesta_do_stredu_zeme_split_047.html","./colophon.html","./favicon.png","./index.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image005.jpg","./resources/image006.jpg","./resources/image008.jpg","./resources/image010.jpg","./resources/image012.jpg","./resources/obalka_cesta_do_stredu_zeme.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
