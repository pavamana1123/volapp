const CACHE_NAME = 'images-cache-v1'
const CDN_URL = 'https://cdn.iskconmysore.org'

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([])
        })
    )
})

self.addEventListener('activate', () => {
    clients.claim()
})

self.addEventListener('fetch', (event) => {
    if (event.request.method == "GET" && event.request.url.startsWith(CDN_URL)) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || fetch(event.request).then((response) => {
                    if (response.status === 200) {
                        const responseToCache = response.clone()
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache)
                        })
                        return response
                    } else {
                        return response
                    }
                })
            })
        )
    }
})

self.addEventListener('message', (event) => {

    if (event.data) {
        switch (event.data.type) {
            case "clearCache":
                caches.open(CACHE_NAME).then(cache => {
                    cache.keys().then(keys => {
                        keys.forEach(key => {
                            if (key.url.includes(event.data.key)) {
                                cache.delete(key)
                            }
                        })
                    })
                })
                break
            default:
                console.log("Unidentified event type: ", event.data.type)
        }
    }
})