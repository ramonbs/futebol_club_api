import { ITeam } from '../Interfaces/Teams/Teams';
import ITeamsModel from '../Interfaces/Teams/TeamsModels';
import SequelizeTeams from '../database/models/SequelizeTeams';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async getTeams(): Promise<ITeam[]> {
    const teams = await this.model.findAll();

    return teams;
  }

  async getTeamsById(id: number): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);

    if (!team) return null;

    return team;
  }
}
