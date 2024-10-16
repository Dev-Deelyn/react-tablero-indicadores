import SeccionPrueba from "containers/salud/SeccionPrueba";
import BaseSection from "containers/common/BaseSection";
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
  // { path: 'efectores-de-salud', icon: routeIcon, title: 'efectores de salud', content: <BaseSection content="efectores de salud" /> },
  // { path: 'camas-publicas', icon: routeIcon, title: 'camas publicas', content: <BaseSection content="camas publicas" /> },
  // { path: 'prestaciones-medicas', icon: routeIcon, title: 'prestaciones medicas', content: <BaseSection content="prestaciones medicas" /> },
  // { path: 'costos-hospitalarios', icon: routeIcon, title: 'costos hospitalarios', content: <BaseSection content="costos hospitalarios" /> },
  // { path: 'guardias-liquidadas', icon: routeIcon, title: 'guardas liquidadas', content: <BaseSection content="guardas liquidadas" /> },
  // { path: 'covid-19', icon: routeIcon, title: 'covid-19', content: <BaseSection content="covid-19" /> },
  // { path: 'dengue', icon: routeIcon, title: 'dengue', content: <BaseSection content="dengue" /> },
  // { path: 'viruela-simica-mpox', icon: routeIcon, title: 'viruela símica (mpox)', content: <BaseSection content="viruela símica (mpox)" /> },
  // { path: 'informe-vacunados-dengue', icon: routeIcon, title: 'informe vacunados - vacunas dengue', content: <BaseSection content="informe vacunados - vacunas dengue" /> },
  // { path: 'informe-vacunados-covid19', icon: routeIcon, title: 'informe vacunados - vacunas covid-19', content: <BaseSection content="informe vacunados - vacunas covid-19" /> },
  // { path: 'vacunas-calendario', icon: routeIcon, title: 'vacunas calendario', content: <BaseSection content="vacunas calendario" /> },
];

const saludRoutes = createRouterRoutes(routePath, routeTitle, routes);

export const saludIndicatorRoute = createMainRoute(routePath, routeTitle, routeIcon)

export default saludRoutes;