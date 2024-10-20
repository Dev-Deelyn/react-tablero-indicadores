import Indexer from "containers/common/Indexer";
import IndicatorContainer from "containers/common/IndicatorContainer";
import GuardiasLiquidadas from "containers/salud/GuardiasLiquidadas";
import IndicadoresGenerales from "containers/salud/IndicadoresGenerales";
import SeccionPrueba from "containers/salud/SeccionPrueba";
import BaseSection from "containers/common/BaseSection";
// import GraficoDePrueba from "containers/salud/GraficoDePrueba";
import IndicatorRoutes from "types/IndicatorRoutes.types";
import { createMainRoute, createRouterRoutes } from "utils/common/roterUtils";

const routePath = 'salud';
const routeTitle = 'salud';
const routeIcon = 'fa-regular:hospital';

const routes: IndicatorRoutes[] = [
  { path: 'seccion-prueba', icon: routeIcon, title: 'Seccion de Prueba', content: <SeccionPrueba /> },
  { path: 'tasas-generales-salud', icon: routeIcon, title: 'tasas generales de salud', content: <BaseSection content="tasas generales de salud" /> },
  { path: 'indicadores-detallado', icon: routeIcon, title: 'indicadores detallado', content: <BaseSection content="indicadores detallado" /> },
  { path: 'mortalidad-infantil', icon: routeIcon, title: 'mortalidad infantil', content: <BaseSection content="mortalidad infantil" /> },
  { path: 'causas-mortalidad', icon: routeIcon, title: 'causas de mortalidad', content: <BaseSection content="causas de mortalidad" /> },
  { path: 'causas-mortalidad-extendido', icon: routeIcon, title: 'causas de mortalidad extendido', content: <BaseSection content="causas de mortalidad extendido" /> },
  { path: 'derivaciones-extraprovinciales', icon: routeIcon, title: 'derivaciones extraprovinciales', content: <BaseSection content="derivaciones extraprovinciales" /> },
  { path: 'derivaciones-intraprovinciales', icon: routeIcon, title: 'derivaciones intraprovinciales', content: <BaseSection content="derivaciones intraprovinciales" /> },
  { path: 'personal-de-salud', icon: routeIcon, title: 'personal de salud', content: <BaseSection content="personal de salud" /> },
  { path: 'indicadores-generales', icon: 'mdi:heart', title: 'indicadores generales', content: <IndicadoresGenerales /> },
  { path: 'guardias-liquidadas', icon: routeIcon, title: 'Guardias liquidadas', content: <GuardiasLiquidadas /> },
  // { path: 'grafico-de-prueba', icon: routeIcon, title: 'grafico de prueba', content: <GraficoDePrueba /> }
];

const saludRoutes = createRouterRoutes(routePath, routeTitle, routes);

export const saludIndicatorRoute = createMainRoute(routePath, routeTitle, routeIcon)

export default saludRoutes;
