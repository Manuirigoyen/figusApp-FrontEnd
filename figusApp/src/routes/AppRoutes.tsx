/**
 * Configuración centralizada de rutas de la aplicación.
 *
 * Define las rutas públicas, privadas y protegidas por rol,
 * controlando el acceso mediante guards de autenticación y permisos.
 */

import { Routes, Route } from "react-router-dom";

import { Home } from "../components/home/Home";
import { Login } from "../components/login/Login";
import { Register } from "../components/register/Register";

import { User } from "../components/user/User";
import { Admin } from "../components/admin/Admin";

import Album from "../components/album/Album";
import Billetera from "../components/billetera/Billetera";
import { Intercambios } from "../components/intercambios/Intercambios";
import { Compras } from "../components/compras/Compras";

import { Ofertas } from "../components/ofertas/Ofertas";
import { Tienda } from "../components/tienda/Tienda";
import { Ruleta } from "../components/rulet/Ruleta";
import { AlbumCompleteRoute } from "./guards/AlbumCompleteRoute";
import SeleccionViaje from "../components/viajes/SeleccionViaje";

import { Err_404 } from "../components/error/Err_404";

import { ProtectedRoute } from "./guards/ProtectedRoute";
import { RoleRoute } from "./guards/RoleRoute";

import { ROUTES } from "./constants/routes.constants";
import { Pago } from "../components/tienda/Pago";
import { Producto } from "../components/tienda/Producto";

/**
 * Componente encargado de declarar todas las rutas disponibles.
 *
 * Incluye:
 * - Rutas públicas de acceso general.
 * - Rutas protegidas para usuarios autenticados.
 * - Rutas con validaciones adicionales.
 * - Rutas restringidas por rol.
 */
export function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.HOME_ALT} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.RULETA} element={<Ruleta />} />
      <Route path={ROUTES.OFERTAS} element={<Ofertas />} />

      {/* Tienda y compras públicas */}
      <Route path={ROUTES.TIENDA} element={<Tienda />} />
      <Route path={ROUTES.PRODUCTO} element={<Producto />} />
      <Route path={ROUTES.PAGO} element={<Pago />} />

      {/* Rutas privadas para usuarios autenticados */}
      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.USER} element={<User />} />
        <Route path={ROUTES.ALBUM} element={<Album />} />
        <Route path={ROUTES.BILLETERA} element={<Billetera />} />
        <Route path={ROUTES.COMPRAS} element={<Compras />} />
        <Route path={ROUTES.INTERCAMBIOS} element={<Intercambios />} />
      </Route>

      {/* Validación de álbum completado antes de continuar */}
      <Route element={<AlbumCompleteRoute />}>
        <Route
          path={ROUTES.SELECCIONAR_VIAJE}
          element={<SeleccionViaje />}
        />
      </Route>

      {/* Ruta exclusiva para administradores */}
      <Route
        path={ROUTES.ADMIN}
        element={
          <RoleRoute role="admin">
            <Admin />
          </RoleRoute>
        }
      />

      {/* Manejo de rutas inexistentes */}
      <Route path={ROUTES.NOT_FOUND} element={<Err_404 />} />
      <Route path="*" element={<Err_404 />} />
    </Routes>
  );
}