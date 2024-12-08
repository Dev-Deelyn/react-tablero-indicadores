// interface User {
//   username: string;
//   email: string;
//   profileType?: string;
//   token?: string;
// }

// export interface UserForm extends Partial<User> {
//   password?: string;
// }

class User {
  public _id?: string;
  public username: string = '';
  public email: string = '';
  public profileType?: 'ADMIN' | 'INVITADO';
  public dashboards?: string[];
  public token?: string;

  constructor(data: Partial<User>) {
    Object.assign(this, data)
  }
}

export class UserForm extends User {
  public password: string = '';

  constructor(data: Partial<UserForm>) {
    super(data);
    Object.assign(this, data);
  }
}

export default User