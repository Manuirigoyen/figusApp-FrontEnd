import { Routes, Route } from "react-router-dom";

import { Home } from "../components/home/Home";
import { Login } from "../components/login/Login";
import { Register } from "../components/register/Register";
import { Ruleta } from "../components/rulet/Ruleta";
import { User } from "../components/user/User";
import { Admin } from "../components/admin/Admin";

import Album  from "../components/album/Album"; //arreglar estructura del componente
import Billetera  from "../components/billetera/Billetera"; //arreglar estructura del componente


import { Err_404 } from "../components/error/Err_404";

import { ProtectedRoute } from "./guards/ProtectedRoute";
import { RoleRoute } from "./guards/RoleRoute";

import { ROUTES } from "./routes.constants";

/**
 * Define todas las rutas de la aplicación.
 * Separa navegación pública y protegida (auth + roles).
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.HOME_ALT} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.RULETA} element={<Ruleta />} />

      <Route path={ROUTES.ALBUM} element={<Album />} /> //ROL USER Y ADMIN
      <Route path={ROUTES.BILLETERA} element={<Billetera/>} /> //ROL  USER Y ADMIN
      
      <Route
        path={ROUTES.USER}
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.ADMIN}
        element={
          <RoleRoute role="admin">
            <Admin />
          </RoleRoute>
        }
      />

      <Route path={ROUTES.NOT_FOUND} element={<Err_404 />} />

    </Routes>
  );
}