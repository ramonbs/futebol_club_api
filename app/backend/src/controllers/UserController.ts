import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../services/UserService';

export default class UserController {
  constructor(
    private userService: UserService,
  ) { }

  public async getUserLogin(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user = await this.userService.getUserLogin(email, password);

    if (user.status !== 'successful') {
      return res.status(mapStatusHTTP(user.status)).json(user.data);
    }

    return res.status(200).json({ token: user.data });
  }

  public async getUserRole(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;

    if (authorization) {
      const user = await this.userService.getUserRole(authorization);

      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      return res.status(200).json({ role: user });
    }

    return res.status(401).json({ message: 'Token not found' });
  }
}
