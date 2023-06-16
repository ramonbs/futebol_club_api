import { NextFunction, Request, Response } from 'express';
import * as joi from 'joi';

export default class MatchValidation {
  static validateMatch(req: Request, res: Response, next: NextFunction) {
    const schema = joi.object().keys({
      homeTeamGoals: joi.number().required(),
      awayTeamGoals: joi.number().required(),
      homeTeamId: joi.number().required(),
      awayTeamId: joi.number().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'Missing parameters' });
    }

    return next();
  }

  static validateIfTeamsAreDifferent(req: Request, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res
        .status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    return next();
  }
}
