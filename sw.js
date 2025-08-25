// --- NOME E VERSION DELLA CACHE ---
const CACHE_NAME = 'palming-app-cache-v1';

// --- FILE DA SALVARE IN CACHE ---
// Aggiungi qui tutti i file che compongono la tua app
const urlsToCache = [
  '/',
  'index.html' // Assumendo che il file HTML si chiami index.html
];

// --- FASE DI INSTALLAZIONE: SALVATAGGIO DEI FILE IN CACHE ---
self.addEventListener('install', event => {
  // Aspetta che la promise di installazione sia risolta
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aperta');
        // Aggiunge tutti i file specificati alla cache
        return cache.addAll(urlsToCache);
      })
  );
});

// --- FASE DI FETCH: INTERCETTAZIONE DELLE RICHIESTE DI RETE ---
self.addEventListener('fetch', event => {
  event.respondWith(
    // Cerca una corrispondenza nella cache
    caches.match(event.request)
      .then(response => {
        // Se la risorsa è trovata nella cache, la restituisce
        if (response) {
          return response;
        }
        // Altrimenti, esegue la richiesta di rete originale
        return fetch(event.request);
      }
    )
  );
});

// --- FASE DI ATTIVAZIONE: PULIZIA DELLE VECCHIE CACHE ---
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Se la cache non è nella whitelist, viene eliminata
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

