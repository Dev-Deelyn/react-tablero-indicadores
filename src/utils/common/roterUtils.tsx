import Indexer from "containers/common/Indexer";
import IndicatorContainer from "containers/common/IndicatorContainer";
import { RouteObject } from "react-router-dom";
import IndicatorRoute from "types/IndicatorRoutes.types";


export const createIndexedRoutes = (routes: IndicatorRoute[]): RouteObject[] => {
  return routes.map(route =>
    ({ path: route.path, element: <IndicatorContainer children={route.content} title={route.title} /> })
  )
}

export const createRouterRoutes = (routePath: string, routeTitle: string, routes: IndicatorRoute[]): RouteObject[] => {
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

export const createMainRoute = (routePath: string, routeTitle: string, routeIcon: string, keyname: string, show: boolean): IndicatorRoute => {
  return ({
    path: `/${routePath}`,
    keyname,
    icon: routeIcon,
    title: routeTitle,
    show
  })
}
// routePath: string, routeTitle: string, 