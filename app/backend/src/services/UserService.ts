import { TokenGenerator } from '../Interfaces/Token';
import { Encrypter } from '../Interfaces/Encrypter';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUser } from '../Interfaces/Users/User';
import IUsersModel from '../Interfaces/Users/UserModel';

export default class UserService {
  constructor(
    private userModel: IUsersModel,
    private encrypter: Encrypter,
    private tokenGenerator: TokenGenerator,
  ) {}

  public async getUserLogin(email: string, password: string):
  Promise<ServiceResponse<IUser | string>> {
    const user = await this.userModel.getUserLogin(email);

    if (!user) {
      return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
    }

    const isPasswordValid = await this.encrypter.compare(password, user.password);

    if (!isPasswordValid) {
      return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
    }

    const token = this.tokenGenerator.generate(user);

    return {
      status: 'successful',
      data: token,
    };
  }

  async getUserRole(token: string): Promise<string | null> {
    const tokenDecoded = this.tokenGenerator.decodeToken(token);

    const user = await this.userModel.getUserRole(tokenDecoded);
    if (!user) return null;

    return user;
  }
}
