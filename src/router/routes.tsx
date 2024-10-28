import Base from "containers/base";
import { createBrowserRouter, Navigate } from "react-router-dom";
import IndicatorRoutes from "types/IndicatorRoutes.types";
import Indexer from "containers/common/Indexer";
import saludRoutes, { saludIndicatorRoute } from "./salud.routes";
import educacionRoutes, { educacionIndicatorRoute } from "./educacion.routes";
import LoginPage from "containers/user/LoginPage";
import UserList from "containers/user/UsersList";

export const indexerRoutes: IndicatorRoutes[] = [
  saludIndicatorRoute,
  educacionIndicatorRoute,
];

export const loguedRoutes = createBrowserRouter([
  {
    path: '/', element: <Base />, children: [
      { index: true, element: <Navigate to={'/main'} /> },
      { path: 'main', element: <Indexer title="indicadores provinciales" routes={indexerRoutes} /> },
      { path: 'users', element: <UserList /> },
      ...saludRoutes,
      ...educacionRoutes
    ],
  },
  { path: 'login', element: <LoginPage /> },
  {
    path: '*',
    element: <Navigate to={'/'} />
  },
])