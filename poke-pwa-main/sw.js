async function addResourcesToCache(resources) {
  const cache = await caches.open("v1"); // åbner en cache storage
  await cache.addAll(resources); // tilføjer alt i projeketet til cache storagen (eller hvad man nu har valgt der skal caches)
}

self.addEventListener("install", async (event)  => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  const data = await response.json()

  // Cacher alle detalje sider af hele pokemon listen
  const names = data.results.map(pokemon => "/details.html?name=" + pokemon.name)

  event.waitUntil(
    addResourcesToCache([
      "/",
      "/index.html",
      "/details.html",

      "/icon.png",
      "/icon144.png",

      "/details.js",
      "/list.js",

      "/manifest.json",
      
      "style.css",
      ...names
    ])
  );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(caches.match(event.request));
  });

  self.addEventListener("fetch", (event) => {
  // Let the browser do its default thing
  // for non-GET requests.
  if (event.request.method !== "GET") return;

  // Prevent the default, and handle the request ourselves.
  event.respondWith(
    (async () => {
      // Try to get the response from a cache.
      const cache = await caches.open("v1"); //skal have samme cache navn som den selv lavede cache
      const cachedResponse = await cache.match(event.request);

      if (cachedResponse) {
        // If we found a match in the cache, return it, but also
        // update the entry in the cache in the background.
        event.waitUntil(cache.add(event.request));
        return cachedResponse;
      }

      // If we didn't find a match in the cache, use the network.
      return fetch(event.request);
    })(),
  );
});