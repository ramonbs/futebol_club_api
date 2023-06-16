import { ILeaderboardParams } from './Leaderboards';

export default interface ILeaderboardModel {
  getInformationOfHomeTeam(): Promise<ILeaderboardParams[] | null>;
}
