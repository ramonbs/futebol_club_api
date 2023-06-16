import { ITeam } from './Teams';

export default interface ITeamsModel {
  getTeams(): Promise<ITeam[]>;
  getTeamsById(id: number): Promise<ITeam | null>;
}
