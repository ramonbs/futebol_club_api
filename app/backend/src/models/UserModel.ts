import { IUser } from '../Interfaces/Users/User';
import IUsersModel from '../Interfaces/Users/UserModel';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUsersModel {
  private model = SequelizeUser;

  async getUserLogin(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({
      where: {
        email,
      },
    });
    if (!user) return null;

    return user;
  }

  async getUserRole(email: string): Promise<string | null> {
    const user = await this.model.findOne({
      where: {
        email,
      },
    });
    if (!user) return null;

    return user.role;
  }
}
