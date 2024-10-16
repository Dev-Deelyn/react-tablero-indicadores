import Indexer from "containers/common/Indexer";
import IndicatorContainer from "containers/common/IndicatorContainer";
import IndicadoresGenerales from "containers/salud/IndicadoresGenerales";
import SeccionPrueba from "containers/salud/SeccionPrueba";
import { RouteObject } from "react-router-dom";
import IndicatorRoutes from "types/IndicatorRoutes.types";

const routePath = 'salud';
const routeTitle = 'salud';
const routeIcon = 'mdi:heart';

const routes: IndicatorRoutes[] = [
  { path: 'indicadores-generales', icon: 'mdi:heart', title: 'indicadores generales', content: <IndicadoresGenerales /> },
  { path: 'seccion-prueba', icon: routeIcon, title: 'Seccion de Prueba', content: <SeccionPrueba /> }
];

const indexedRoutes: RouteObject[] = routes.map(route =>
  ({ path: route.path, element: <IndicatorContainer children={route.content} title={route.title} /> })
);

const saludRoutes: RouteObject[] = [
  {
    path: routePath, children: [
      { index: true, element: <Indexer title={routeTitle} routes={routes} /> },
      ...indexedRoutes
    ]
  }
]

export const saludIndicatorRoute: IndicatorRoutes = {
  path: `/${routePath}`,
  icon: routeIcon,
  title: routeTitle
};

export default saludRoutes;