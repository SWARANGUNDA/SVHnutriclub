"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    // Register the service worker only in production or if explicitly testing PWA
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("[SVH PWA] Service Worker registered with scope:", registration.scope);
          })
          .catch((error) => {
            console.error("[SVH PWA] Service Worker registration failed:", error);
          });
      });
    }
  }, []);

  return null; // This component doesn't render any UI
}
