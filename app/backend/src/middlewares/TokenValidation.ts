import { NextFunction, Request, Response } from 'express';
import TokenGeneratorJwt from '../services/TokenGenerator';

const jwt = new TokenGeneratorJwt();

export default class TokenValidator {
  static validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers;

    if (!token.authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const isValid = jwt.verifyToken(token.authorization);

    if (!isValid) {
      return res
        .status(401)
        .json({ message: 'Token must be a valid token' });
    }

    next();
  }
}
