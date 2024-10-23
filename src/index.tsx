import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './ServiceWorkerRegistration'; // Importa tu archivo de service worker

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Registra el Service Worker
serviceWorkerRegistration.register();
