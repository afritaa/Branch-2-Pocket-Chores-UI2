import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NeonAuthUIProvider } from '@neondatabase/neon-js/auth/react';
// This import is handled by esm.sh in index.html importmap to inject CSS
import '@neondatabase/neon-js/ui/css'; 
import { BrowserRouter } from 'react-router-dom';
import { authClient } from './lib/auth';

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Use absolute path '/sw.js' so it works from sub-routes like /auth/sign-in
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <NeonAuthUIProvider emailOTP authClient={authClient}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </NeonAuthUIProvider>
  </React.StrictMode>
);
