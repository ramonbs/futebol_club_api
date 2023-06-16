import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeam } from '../Interfaces/Teams/Teams';
import ITeamsModel from '../Interfaces/Teams/TeamsModels';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel,
  ) { }

  public async getTeams(): Promise<ServiceResponse<ITeam[] | string>> {
    const teams = await this.teamsModel.getTeams();

    if (!teams) {
      return { status: 'notFound', data: { message: 'Teams not found' } };
    }

    return { status: 'successful', data: teams };
  }

  public async getTeamsById(id: number): Promise<ServiceResponse<ITeam | string>> {
    const team = await this.teamsModel.getTeamsById(id);

    if (!team) {
      return { status: 'notFound', data: { message: 'Teams not found' } };
    }

    return { status: 'successful', data: team };
  }
}
