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

import { Err_404 } from "../components/error/Err_404";

import { ProtectedRoute } from "./guards/ProtectedRoute";
import { RoleRoute } from "./guards/RoleRoute";
import { AlbumCompleteRoute } from "./guards/AlbumCompleteRoute";

import { ROUTES } from "./routes.constants";
import SeleccionViaje from "../components/viajes/SeleccionViaje";

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.HOME_ALT} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />

      <Route path={ROUTES.RULETA} element={<Ruleta />} />
      <Route path={ROUTES.OFERTAS} element={<Ofertas />} />
      <Route path={ROUTES.TIENDA} element={<Tienda />} />

      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.USER} element={<User />} />
        <Route path={ROUTES.ALBUM} element={<Album />} />
        <Route path={ROUTES.BILLETERA} element={<Billetera />} />
        <Route path={ROUTES.COMPRAS} element={<Compras />} />
        <Route path={ROUTES.INTERCAMBIOS} element={<Intercambios />} />

        <Route element={<AlbumCompleteRoute />}>
          <Route path={ROUTES.SELECCIONAR_VIAJE} element={<SeleccionViaje />} />
        </Route>
      </Route>

      <Route
        path={ROUTES.ADMIN}
        element={
          <RoleRoute role="admin">
            <Admin />
          </RoleRoute>
        }
      />

      <Route path={ROUTES.NOT_FOUND} element={<Err_404 />} />
      <Route path="*" element={<Err_404 />} />
    </Routes>
  );
}