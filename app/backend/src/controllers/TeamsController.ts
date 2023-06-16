import { Response, Request } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(
    private teamsService: TeamsService,
  ) { }

  public async getTeams(_req: Request, res: Response): Promise<Response> {
    const teams = await this.teamsService.getTeams();

    if (teams.status !== 'successful') {
      return res.status(mapStatusHTTP(teams.status)).json(teams.data);
    }

    return res.status(200).json(teams.data);
  }

  public async getTeamById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const team = await this.teamsService.getTeamsById(Number(id));

    if (team.status !== 'successful') {
      return res.status(mapStatusHTTP(team.status)).json(team.data);
    }

    return res.status(200).json(team.data);
  }
}
