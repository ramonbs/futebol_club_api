import { IUser } from './Users/User';

export interface TokenGenerator {
  generate(user: IUser): string,
  verifyToken(token: string): boolean,
  decodeToken(token: string): string,
}
