import Base from "containers/base";
import { createBrowserRouter, Navigate } from "react-router-dom";
import IndicatorRoute from "types/IndicatorRoutes.types";
import Indexer from "containers/common/Indexer";
import saludRoutes, { saludIndicatorRoute } from "./salud.routes";
import educacionRoutes, { educacionIndicatorRoute } from "./educacion.routes";
import LoginPage from "containers/user/LoginPage";
import UserList from "containers/user/UsersList";
import DashboardList from "containers/board/DashboardList";

export const indexerRoutes: IndicatorRoute[] = [
  saludIndicatorRoute,
  educacionIndicatorRoute,
];

export const loguedRoutes = createBrowserRouter([
  {
    path: '/', element: <Base />, children: [
      { index: true, element: <Navigate to={'/main'} /> },
      { path: 'usuarios', element: <UserList /> },
      { path: 'tableros', element: <DashboardList /> },
      { path: 'main', element: <Indexer main title="indicadores provinciales" routes={indexerRoutes} /> },
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