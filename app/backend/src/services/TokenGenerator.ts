import * as jwt from 'jsonwebtoken';
import { IUser } from '../Interfaces/Users/User';
import { TokenGenerator } from '../Interfaces/Token';

export default class TokenGeneratorJwt implements TokenGenerator {
  private jwt = jwt;

  generate(user: IUser): string {
    const token = this.jwt.sign({ email: user.email }, 'jwt_secret');
    return token;
  }

  verifyToken(token: string): boolean {
    try {
      this.jwt.verify(token, 'jwt_secret');

      return true;
    } catch (error) {
      return false;
    }
  }

  decodeToken(token: string): string {
    const tokenDecoded = this.jwt.decode(token, { complete: true });
    if (!tokenDecoded) return '';

    return tokenDecoded.payload.email;
  }
}
