import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './ServiceWorkerRegistration'; // Importa tu archivo de service worker

/**
 * Punto de entrada principal de la aplicación React.
 *
 * Este archivo se encarga de renderizar el componente principal de la aplicación
 * y registrar el Service Worker para habilitar funcionalidades de PWA.
 * 
 * @function
 * @returns {void}
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
