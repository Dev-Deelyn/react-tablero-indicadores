import Indexer from "containers/common/Indexer";
import IndicadoresGenerales from "containers/salud/IndicadoresGenerales";
import { RouteObject } from "react-router-dom";
import IndicatorRoutes from "types/IndicatorRoutes.types";

const routes: IndicatorRoutes[] = [
  { path: 'indicadores-generales', icon: 'mdi:heart', title: 'indicadores generales', content: <IndicadoresGenerales /> }
];

const indexedRoutes: RouteObject[] = routes.map(route => ({ path: route.path, element: route.content }))

const saludRoutes: RouteObject[] = [
  {
    path: 'salud', children: [
      { index: true, element: <Indexer title="Salud" routes={routes} /> },
      ...indexedRoutes
    ]
  }
]

export default saludRoutes

