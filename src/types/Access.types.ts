export interface Section {
  _id: string;
  keyname: string;
  show: boolean;
}

export interface Dashboard {
  _id: string;
  keyname: string;
  show: boolean;
  icon: string;
  sections: Section[];
}

export interface AccessEntry {
  dashboard: string; // id del dashboard al que tiene acceso el usuario
  sections: string[]; // ids de las secciones a las que tiene acceso
}

export interface DashboardWithAllowedSections extends Dashboard {
  allowedSections: Section[];
}
