import { JSX } from 'react';
import AnalyticsExcelContainer from 'containers/AnalyticsExcelContainer';
import EfectoresDeSalud from 'containers/salud/EfectoresDeSalud';
import Coparticipacion from 'containers/economia/Coparticipacion';

// Estructura: contentMap[keyname-del-tablero][keyname-de-la-sección]

const contentMap: Record<string, Record<string, JSX.Element>> = {
  // 'keyname-del-tablero': {
  //   'keyname-de-la-seccion': <Componente />
  // }
  "economia": {
    "coparticipacion---cfi-y-totales": <Coparticipacion />
  },
  "tablero-de-salud": {
    "efectores-de-salud": <EfectoresDeSalud />
  }
};

export const getSectionContent = (dashboardKeyname: string, sectionKeyname: string): JSX.Element => {
  return contentMap[dashboardKeyname]?.[sectionKeyname] ?? <AnalyticsExcelContainer />;
};

export default contentMap;