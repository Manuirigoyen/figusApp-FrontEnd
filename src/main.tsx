import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'
import { App } from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('No se encontró el elemento #root en el DOM.');
}

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);