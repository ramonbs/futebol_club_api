/* eslint-disable class-methods-use-this */
import { NextFunction, Request, Response } from 'express';
import * as joi from 'joi';

class Validation {
  static validateLogin(req: Request, res: Response, next: NextFunction) {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required().min(6),
    });

    const { error } = schema.validate(req.body);
    console.log(error);

    if (error?.message === '"email" must be a valid email') {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (error?.message === '"password" length must be at least 6 characters long') {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (error) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  }
}

export default Validation;
