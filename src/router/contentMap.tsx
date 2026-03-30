import { JSX } from 'react';
import AnalyticsExcelContainer from 'containers/AnalyticsExcelContainer';

// Estructura: contentMap[keyname-del-tablero][keyname-de-la-sección]

const contentMap: Record<string, Record<string, JSX.Element>> = {
  // 'keyname-del-tablero': {
  //   'keyname-de-la-seccion': <Componente />
  // }
};

export const getSectionContent = (dashboardKeyname: string, sectionKeyname: string): JSX.Element => {
  return contentMap[dashboardKeyname]?.[sectionKeyname] ?? <AnalyticsExcelContainer />;
};

export default contentMap;