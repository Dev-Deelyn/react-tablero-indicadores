import Sections from './Sections';

class Dashboard {
  public _id?: string;
  public keyname: string = '';
  public show: boolean = false;
  public sections: Sections[] = []; // Cambiado de string[] a Sections[]
  public icon?: string;
  
  constructor(data: Partial<Dashboard>) {
    Object.assign(this, data);
  }
}

export class DashboardForm extends Dashboard {
  public newKeyname?: string;

  constructor(data: Partial<DashboardForm>) {
    super(data);
    Object.assign(this, data);
  }
}

export default Dashboard;
