import Root from "containers/root";
import { createBrowserRouter, Navigate } from "react-router-dom";
import saludRoutes from "./salud.routes";
import IndicatorRoutes from "types/IndicatorRoutes.types";
import Indexer from "containers/common/Indexer";

const indexerRoutes: IndicatorRoutes[] = [
  { path: '/salud', icon: 'mdi:heart', title: 'salud' },
  { path: '/salud', icon: 'material-symbols:school', title: 'educación' },
];

export const loguedRoutes = createBrowserRouter([
  {
    path: '/', element: <Root />, children: [
      { index: true, element: <Navigate to={'/main'} /> },
      { path: 'main', element: <Indexer title="General" routes={indexerRoutes} /> },
      ...saludRoutes
    ],
  },
  {
    path: '*',
    element: <Navigate to={'/'} />
  },
])