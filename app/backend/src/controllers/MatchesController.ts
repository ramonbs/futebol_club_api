import { Request, Response } from 'express';
import { IMatchModel } from '../Interfaces/Matches/Matches';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(
    private matchesService: MatchesService,
  ) {}

  async getMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    if (!inProgress) {
      const matches = await this.matchesService.getAllMatches();
      if (matches.status === 'notFound') {
        return res.status(mapStatusHTTP(matches.status)).json(matches.data);
      }

      return res.status(mapStatusHTTP(matches.status)).json(matches.data);
    }

    const inProgressBool = inProgress === 'true';

    if (inProgressBool) {
      const matches = await this.matchesService.getMatchesBasedinProgress(true);
      return res.status(mapStatusHTTP(matches.status)).json(matches.data);
    }

    const matches = await this.matchesService.getMatchesBasedinProgress(false);
    return res.status(mapStatusHTTP(matches.status)).json(matches.data);
  }

  async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const updatedMatch = await this.matchesService.updateMatchById(
      +id,
    );

    return res.status(mapStatusHTTP(updatedMatch.status)).json(updatedMatch.data);
  }

  async updateMatchGoals(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const goals = {
      homeTeamGoals,
      awayTeamGoals,
    } as IMatchModel;

    const updateMAtch = await this.matchesService.updateMatchGoalsById(
      +id,
      goals,
    );

    return res.status(mapStatusHTTP(updateMAtch.status)).json(updateMAtch.data);
  }

  async registerMatch(req: Request, res: Response): Promise<Response> {
    const match = req.body;
    const newMatchCreated = await this.matchesService.createMatch(match);

    if (newMatchCreated.status === 'notFound') {
      return res.status(mapStatusHTTP(newMatchCreated.status)).json(newMatchCreated.data);
    }

    return res.status(mapStatusHTTP(newMatchCreated.status)).json(newMatchCreated.data.message);
  }
}
