self.addEventListener('install', (event) => {
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    self.clients.claim();
    event.waitUntil(
      (async () => {
        if ('navigationPreload' in self.registration) {
          await self.registration.navigationPreload.enable();
        }
      })(),
    );
  });
  