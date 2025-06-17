// src/utils/mapDashboard.ts
import Dashboard from 'types/Dashboard'; // Tu clase con _id?: string
import { Dashboard as DashboardAccess, Section as SectionAccess } from './../types/Access.types';

// Función para convertir un objeto de la clase Sections a un objeto compatible con SectionAccess.
const mapSection = (sec: any): SectionAccess => {
  if (!sec._id) {
    throw new Error("La sección no tiene _id definido");
  }
  return {
    _id: sec._id,
    keyname: sec.keyname,
    show: sec.show,
  };
};

export const mapDashboard = (d: Dashboard): DashboardAccess => {
  if (!d._id) {
    throw new Error(`El dashboard "${d.keyname}" no tiene _id definido`);
  }
  return {
    _id: d._id,
    keyname: d.keyname,
    show: d.show,
    icon: d.icon || "", // Si no hay icono, asignamos cadena vacía para cumplir el tipo string
    sections: d.sections.map(mapSection),
  };
};