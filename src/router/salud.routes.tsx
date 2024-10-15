import IndicadoresGenerales from "containers/salud/IndicadoresGenerales";
import IndicatorRoutes from "types/IndicatorRoutes.types";
import { createMainRoute, createRouterRoutes } from "utils/common/roterUtils";

const routePath = 'salud';
const routeTitle = 'salud';
const routeIcon = 'mdi:heart';

const routes: IndicatorRoutes[] = [
  { path: 'indicadores-generales', icon: routeIcon, title: 'indicadores generales', content: <IndicadoresGenerales /> }
];

const saludRoutes = createRouterRoutes(routePath, routeTitle, routes);

export const saludIndicatorRoute = createMainRoute(routePath, routeTitle, routeIcon)

export default saludRoutes;