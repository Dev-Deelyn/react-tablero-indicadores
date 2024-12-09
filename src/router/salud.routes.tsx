import BaseSection from "containers/common/BaseSection";
import GraficoDePrueba from "containers/salud/GraficoDePrueba";
import DashboardIcons from "types/DashboardIcons";
import IndicatorRoute from "types/IndicatorRoutes.types";
import { createMainRoute, createRouterRoutes } from "utils/common/roterUtils";

const routeTitle = 'salud';
const keyName = 'salud'; // Este valor define como encontrar al registro en la BD
const routePath = keyName;
const routeIcon = DashboardIcons[keyName];
const show = true;

const routes: IndicatorRoute[] = [
  { keyname: keyName, path: 'tasas-generales-salud', icon: routeIcon, title: 'tasas generales de salud', content: <BaseSection content="tasas generales de salud" /> },
  { keyname: keyName, path: 'indicadores-detallado', icon: routeIcon, title: 'indicadores detallado', content: <BaseSection content="indicadores detallado" /> },
  { keyname: keyName, path: 'mortalidad-infantil', icon: routeIcon, title: 'mortalidad infantil', content: <BaseSection content="mortalidad infantil" /> },
  { keyname: keyName, path: 'causas-mortalidad', icon: routeIcon, title: 'causas de mortalidad', content: <BaseSection content="causas de mortalidad" /> },
  { keyname: keyName, path: 'causas-mortalidad-extendido', icon: routeIcon, title: 'causas de mortalidad extendido', content: <BaseSection content="causas de mortalidad extendido" /> },
  { keyname: keyName, path: 'derivaciones-extraprovinciales', icon: routeIcon, title: 'derivaciones extraprovinciales', content: <BaseSection content="derivaciones extraprovinciales" /> },
  { keyname: keyName, path: 'derivaciones-intraprovinciales', icon: routeIcon, title: 'derivaciones intraprovinciales', content: <BaseSection content="derivaciones intraprovinciales" /> },
  { keyname: keyName, path: 'personal-de-salud', icon: routeIcon, title: 'personal de salud', content: <BaseSection content="personal de salud" /> },
  // { keyname: keyName, path: 'efectores-de-salud', icon: routeIcon, title: 'efectores de salud', content: <BaseSection content="efectores de salud" /> },
  // { keyname: keyName, path: 'camas-publicas', icon: routeIcon, title: 'camas publicas', content: <BaseSection content="camas publicas" /> },
  // { keyname: keyName, path: 'prestaciones-medicas', icon: routeIcon, title: 'prestaciones medicas', content: <BaseSection content="prestaciones medicas" /> },
  // { keyname: keyName, path: 'costos-hospitalarios', icon: routeIcon, title: 'costos hospitalarios', content: <BaseSection content="costos hospitalarios" /> },
  // { keyname: keyName, path: 'guardias-liquidadas', icon: routeIcon, title: 'guardas liquidadas', content: <BaseSection content="guardas liquidadas" /> },
  // { keyname: keyName, path: 'covid-19', icon: routeIcon, title: 'covid-19', content: <BaseSection content="covid-19" /> },
  // { keyname: keyName, path: 'dengue', icon: routeIcon, title: 'dengue', content: <BaseSection content="dengue" /> },
  // { keyname: keyName, path: 'viruela-simica-mpox', icon: routeIcon, title: 'viruela símica (mpox)', content: <BaseSection content="viruela símica (mpox)" /> },
  // { keyname: keyName, path: 'informe-vacunados-dengue', icon: routeIcon, title: 'informe vacunados - vacunas dengue', content: <BaseSection content="informe vacunados - vacunas dengue" /> },
  // { keyname: keyName, path: 'informe-vacunados-covid19', icon: routeIcon, title: 'informe vacunados - vacunas covid-19', content: <BaseSection content="informe vacunados - vacunas covid-19" /> },
  // { keyname: keyName, path: 'vacunas-calendario', icon: routeIcon, title: 'vacunas calendario', content: <BaseSection content="vacunas calendario" /> },
  { keyname: keyName, path: 'grafico-de-prueba', icon: routeIcon, title: 'grafico de prueba', content: <GraficoDePrueba /> },
];

const saludRoutes = createRouterRoutes(routePath, routeTitle, routes);

export const objSaludRoutes = {
  show,
  routes: saludRoutes
}

export const saludIndicatorRoute = createMainRoute(routePath, routeTitle, routeIcon, keyName, show)

export default saludRoutes;