const CACHE_NAME = 'wk-poule-v1';

// We houden het simpel: installeer de service worker
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// Zorgt ervoor dat de app altijd de nieuwste versie van internet haalt (Network First)
// Zo voorkom je dat vrienden een oude versie van je app zien als je iets aanpast.
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return new Response("Je bent offline. Maak verbinding met internet om de WK Poule te gebruiken.");
        })
    );
});