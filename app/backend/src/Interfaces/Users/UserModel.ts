import { IUser } from './User';

export default interface IUsersModel {
  getUserLogin(email: string): Promise<IUser | null>;
  getUserRole(email: string): Promise<string | null>;
}
