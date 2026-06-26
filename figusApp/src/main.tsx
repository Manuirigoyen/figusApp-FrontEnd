/**
 * Punto de entrada principal de la aplicación React.
 *
 * Configura el renderizado de la aplicación, los proveedores globales
 * de autenticación y navegación, además de cargar estilos y librerías base.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./routes/hooks/AuthProvider";
import "./styles/fonts.css";
import "./styles/variables.css";
import "./styles/layout.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

/**
 * Renderiza la aplicación dentro del elemento raíz del documento.
 */
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);