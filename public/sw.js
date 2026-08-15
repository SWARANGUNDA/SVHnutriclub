/// <reference lib="webworker" />

const CACHE_NAME = "svh-v1";
const OFFLINE_URL = "/offline";

const PRECACHE_URLS = [
  "/",
  "/products",
  "/about",
  "/blog",
  "/services",
  "/contact",
  "/manifest.json",
];

self.addEventListener("install", (event) => {
  const e = event as ExtendableEvent;
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  (self as unknown as ServiceWorkerGlobalScope).skipWaiting();
});

self.addEventListener("activate", (event) => {
  const e = event as ExtendableEvent;
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  (self as unknown as ServiceWorkerGlobalScope).clients.claim();
});

self.addEventListener("fetch", (event) => {
  const e = event as FetchEvent;
  const { request } = e;

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Skip API routes and auth routes
  if (request.url.includes("/api/")) return;

  // Network-first strategy for pages
  if (request.mode === "navigate") {
    e.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful navigation responses
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });
          return response;
        })
        .catch(() => {
          // Try cache fallback
          return caches.match(request).then((cached) => {
            return cached || caches.match(OFFLINE_URL) || new Response("Offline", { status: 503 });
          });
        })
    );
    return;
  }

  // Cache-first for static assets
  if (
    request.url.match(/\.(js|css|png|jpg|jpeg|webp|svg|woff2|ico)$/)
  ) {
    e.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });
          return response;
        });
      })
    );
    return;
  }
});
