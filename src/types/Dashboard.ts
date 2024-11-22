class Dashboard {
  public _id?: string;
  public keyname: string = '';
  public show: boolean = false;

  constructor(data: Partial<Dashboard>) {
    Object.assign(this, data)
  }
}

export default Dashboard