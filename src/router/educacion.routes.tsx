import BaseSection from "containers/common/BaseSection";
import IndicadoresGenerales from "containers/salud/IndicadoresGenerales";
import IndicatorRoutes from "types/IndicatorRoutes.types";
import { createMainRoute, createRouterRoutes } from "utils/common/roterUtils";

const routePath = 'educacion';
const routeTitle = 'educación';
const routeIcon = 'material-symbols:school';

const routes: IndicatorRoutes[] = [
  { path: 'indicadores-generales', icon: routeIcon, title: 'indicadores educativos', content: <BaseSection content='indicadores educativos' /> },
  { path: 'indicadores-generales', icon: routeIcon, title: 'indicadores educativos v2', content: <IndicadoresGenerales /> }
];

const educacionRoutes = createRouterRoutes(routePath, routeTitle, routes);

export const educacionIndicatorRoute = createMainRoute(routePath, routeTitle, routeIcon);

export default educacionRoutes;