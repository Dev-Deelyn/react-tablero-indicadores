class Sections {
  public _id?: string;
  public keyname: string = '';
  public show: boolean = false;

  constructor(data: Partial<Sections>) {
    Object.assign(this, data)
  }
}

export default Sections