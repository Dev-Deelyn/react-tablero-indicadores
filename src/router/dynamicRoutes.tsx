import { RouteObject } from "react-router-dom";
import Indexer from "containers/common/Indexer";
import IndicatorContainer from "containers/common/IndicatorContainer";
import IndicatorRoute from "types/IndicatorRoutes.types";
import { getSectionContent } from "./contentMap";
import Dashboard from "types/Dashboard";

export const buildRoutesFromDashboards = (dashboards: Dashboard[], accessSections: Record<string, string[]>): RouteObject[] => {
  return dashboards
    .filter(d => d.show)
    .flatMap(dashboard => {
      const allowedSections = accessSections[dashboard.keyname] ?? [];

      const sectionRoutes: RouteObject[] = dashboard.sections
        .filter(s => s.show && allowedSections.includes(s.keyname))
        .map(section => ({
          path: section.keyname,
          element: (
            <IndicatorContainer title={section.name || section.keyname}>
              {getSectionContent(dashboard.keyname, section.keyname)}
            </IndicatorContainer>
          )
        }));

      const indexerRoutes: IndicatorRoute[] = dashboard.sections
        .filter(s => s.show && allowedSections.includes(s.keyname))
        .map(section => ({
          path: `/${dashboard.keyname}/${section.keyname}`,
          keyname: section.keyname,
          title: section.name || section.keyname,
          icon: dashboard.icon,
          show: section.show
        }));

      return [{
        path: dashboard.keyname,
        children: [
          { index: true, element: <Indexer title={dashboard.name || dashboard.keyname} routes={indexerRoutes} /> },
          ...sectionRoutes
        ]
      }];
    });
};

export const buildIndexerRoutes = (dashboards: Dashboard[]): IndicatorRoute[] => {
  // console.log('Dashboards en dynamicRoutes.tsx', dashboards)
  return dashboards
    .filter(d => d.show)
    .map(dashboard => ({
      path: `/${dashboard.keyname}`,
      keyname: dashboard.keyname,
      title: dashboard.name || dashboard.keyname,
      icon: dashboard.icon,
      show: dashboard.show
    }));
};