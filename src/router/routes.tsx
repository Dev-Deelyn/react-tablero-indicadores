import Base from "containers/base";
import { createBrowserRouter, Navigate } from "react-router-dom";
import IndicatorRoute from "types/IndicatorRoutes.types";
import Indexer from "containers/common/Indexer";
import { objSaludRoutes, saludIndicatorRoute } from "./salud.routes";
import { educacionIndicatorRoute, objEducacionRoutes } from "./educacion.routes";
import LoginPage from "containers/user/LoginPage";
import UserList from "containers/user/UsersList";
import DashboardList from "containers/board/DashboardList";

export const indexerRoutes: IndicatorRoute[] = [
  saludIndicatorRoute,
  educacionIndicatorRoute,
];

export const routesKeynamesVisibles = indexerRoutes.filter(route => route.show).map(route => route.keyname);
export const routesKeynames = indexerRoutes.map(route => route.keyname);

const visibleRoutes = [
  objSaludRoutes,
  objEducacionRoutes
].filter(obj => obj.show).flatMap(obj => obj.routes);

export const loguedRoutes = createBrowserRouter([
  {
    path: '/', element: <Base />, children: [
      { index: true, element: <Navigate to={'/main'} /> },
      { path: 'usuarios', element: <UserList /> },
      { path: 'tableros', element: <DashboardList /> },
      { path: 'main', element: <Indexer main title="indicadores provinciales" routes={indexerRoutes} /> },
      ...visibleRoutes
    ],
  },
  { path: 'login', element: <LoginPage /> },
  {
    path: '*',
    element: <Navigate to={'/'} />
  },
])