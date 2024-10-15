import Indexer from "containers/common/Indexer";
import IndicatorContainer from "containers/common/IndicatorContainer";
import IndicadoresGenerales from "containers/salud/IndicadoresGenerales";
import { RouteObject } from "react-router-dom";
import IndicatorRoutes from "types/IndicatorRoutes.types";

const routePath = 'educacion';
const routeTitle = 'educación';
const routeIcon = 'material-symbols:school';

const routes: IndicatorRoutes[] = [
  { path: 'indicadores-generales', icon: routeIcon, title: 'indicadores generales', content: <IndicadoresGenerales /> }
];

const indexedRoutes: RouteObject[] = routes.map(route =>
  ({ path: route.path, element: <IndicatorContainer children={route.content} title={route.title} /> })
);

const educacionRoutes: RouteObject[] = [
  {
    path: routePath, children: [
      { index: true, element: <Indexer title={routeTitle} routes={routes} /> },
      ...indexedRoutes
    ]
  }
]

export const educacionIndicatorRoute: IndicatorRoutes = {
  path: `/${routePath}`,
  icon: routeIcon,
  title: routeTitle
};

export default educacionRoutes;