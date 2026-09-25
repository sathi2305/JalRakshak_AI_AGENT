import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register JalRakshak Offline Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        console.log('[JalRakshak SW] Service Worker registered with scope:', reg.scope);

        // Pre-warm cache if controller is active
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({ type: 'SYNC_TELEMETRY_CACHE' });
        }

        // Check if there is already a waiting worker upon initial page load
        if (reg.waiting && navigator.serviceWorker.controller) {
          console.log('[JalRakshak SW] Found existing waiting worker ready for update.');
          window.dispatchEvent(
            new CustomEvent('swUpdateAvailable', {
              detail: { waitingWorker: reg.waiting }
            })
          );
        }

        // Listen for new service worker updates
        reg.onupdatefound = () => {
          const installingWorker = reg.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // A previous version was already active; the new version is now ready
                  console.log('[JalRakshak SW] New version finished installing! Triggering update toast...');
                  window.dispatchEvent(
                    new CustomEvent('swUpdateAvailable', {
                      detail: { waitingWorker: installingWorker }
                    })
                  );
                } else {
                  console.log('[JalRakshak SW] Initial service worker cached content for the first time.');
                }
              }
            };
          }
        };
      })
      .catch((err) => {
        console.warn('[JalRakshak SW] Service Worker registration failed:', err);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
