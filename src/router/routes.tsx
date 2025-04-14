import IndicatorRoute from "types/IndicatorRoutes.types";
import { objSaludRoutes, saludIndicatorRoute } from "./salud.routes";
import { educacionIndicatorRoute, objEducacionRoutes } from "./educacion.routes";

// Rutas de indicadores para el componente Indexer
export const indexerRoutes: IndicatorRoute[] = [
  saludIndicatorRoute,
  educacionIndicatorRoute,
];

// Keynames para usar en filtros, visibilidad, etc.
export const routesKeynamesVisibles = indexerRoutes
  .filter(route => route.show)
  .map(route => route.keyname);

export const routesKeynames = indexerRoutes.map(route => route.keyname);

// Rutas visibles para el usuario según el flag `show`
export const visibleRoutes = [
  objSaludRoutes,
  objEducacionRoutes
]
  .filter(obj => obj.show)
  .flatMap(obj => obj.routes);
