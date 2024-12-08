import BaseSection from "containers/common/BaseSection";
import DashboardIcons from "types/DashboardIcons";
import IndicatorRoute from "types/IndicatorRoutes.types";
import { createMainRoute, createRouterRoutes } from "utils/common/roterUtils";

const routePath = 'educacion';
const routeTitle = 'educación';
const keyName = 'educacion'; // Este valor define como encontrar al registro en la BD
const routeIcon = DashboardIcons[keyName];
const show = false;

const routes: IndicatorRoute[] = [
  { keyname: keyName, path: 'indicadores-provinciales', icon: routeIcon, title: 'indicadores provinciales', content: <BaseSection content='indicadores provinciales' /> },
  { keyname: keyName, path: 'indicadores-detallados', icon: routeIcon, title: 'indicadores detallados', content: <BaseSection content='indicadores detallados' /> },
  { keyname: keyName, path: 'otros-indicadores', icon: routeIcon, title: 'otros indicadores', content: <BaseSection content='otros indicadores' /> },
  // { keyname: keyName, path: 'unidades-educativas', icon: routeIcon, title: 'unidades educativas', content: <BaseSection content='unidades educativas' /> },
  // { keyname: keyName, path: 'tecnicas-y-agrotecnicas', icon: routeIcon, title: 'técnicas y agrotécnicas', content: <BaseSection content='técnicas y agrotécnicas' /> },
  // { keyname: keyName, path: 'mapa-ofertas-educativas', icon: routeIcon, title: 'mapa ofertas educativas', content: <BaseSection content='mapa ofertas educativas' /> },
];

const educacionRoutes = createRouterRoutes(routePath, routeTitle, routes);

export const educacionIndicatorRoute = createMainRoute(routePath, routeTitle, routeIcon, keyName, show);

export default educacionRoutes;