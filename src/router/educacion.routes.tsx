import BaseSection from "containers/common/BaseSection";
import IndicatorRoutes from "types/IndicatorRoutes.types";
import { createMainRoute, createRouterRoutes } from "utils/common/roterUtils";

const routePath = 'educacion';
const routeTitle = 'educación';
const routeIcon = 'material-symbols:school';

const routes: IndicatorRoutes[] = [
  { path: 'indicadores-provinciales', icon: routeIcon, title: 'indicadores provinciales', content: <BaseSection content='indicadores provinciales' /> },
  { path: 'indicadores-detallados', icon: routeIcon, title: 'indicadores detallados', content: <BaseSection content='indicadores detallados' /> },
  { path: 'otros-indicadores', icon: routeIcon, title: 'otros indicadores', content: <BaseSection content='otros indicadores' /> },
  { path: 'unidades-educativas', icon: routeIcon, title: 'unidades educativas', content: <BaseSection content='unidades educativas' /> },
  { path: 'tecnicas-y-agrotecnicas', icon: routeIcon, title: 'técnicas y agrotécnicas', content: <BaseSection content='técnicas y agrotécnicas' /> },
  { path: 'mapa-ofertas-educativas', icon: routeIcon, title: 'mapa ofertas educativas', content: <BaseSection content='mapa ofertas educativas' /> },
];

const educacionRoutes = createRouterRoutes(routePath, routeTitle, routes);

export const educacionIndicatorRoute = createMainRoute(routePath, routeTitle, routeIcon);

export default educacionRoutes;