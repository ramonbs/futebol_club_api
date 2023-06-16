import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService: LeaderboardService,
  ) {}

  async getLeaderboard(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await this.leaderboardService.getLeaderboard();

    return res.status(mapStatusHTTP(leaderboard.status)).json(leaderboard.data);
  }
}
