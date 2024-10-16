import Indexer from "containers/common/Indexer";
import IndicatorContainer from "containers/common/IndicatorContainer";
import { RouteObject } from "react-router-dom";
import IndicatorRoutes from "types/IndicatorRoutes.types";


export const createIndexedRoutes = (routes: IndicatorRoutes[]): RouteObject[] => {
  return routes.map(route =>
    ({ path: route.path, element: <IndicatorContainer children={route.content} title={route.title} /> })
  )
}

export const createRouterRoutes = (routePath: string, routeTitle: string, routes: IndicatorRoutes[]): RouteObject[] => {
  const indexedRoutes = createIndexedRoutes(routes);

  return ([
    {
      path: routePath, children: [
        { index: true, element: <Indexer title={routeTitle} routes={routes} /> },
        ...indexedRoutes
      ]
    }
  ]);
}

export const createMainRoute = (routePath: string, routeTitle: string, routeIcon: string) => {
  return ({
    path: `/${routePath}`,
    icon: routeIcon,
    title: routeTitle
  })
}
// routePath: string, routeTitle: string, 