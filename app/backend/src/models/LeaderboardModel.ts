import { ILeaderboardParams } from '../Interfaces/Leaderboards/Leaderboards';
import SequelizeTeams from '../database/models/SequelizeTeams';
import ILeaderboardModel from '../Interfaces/Leaderboards/LeaderboardsModel';
import SequelizeMatches from '../database/models/SequelizeMatches';

export default class LeaderboardModel implements ILeaderboardModel {
  private model = SequelizeMatches;

  async getInformationOfHomeTeam(): Promise<ILeaderboardParams[] | null> {
    const homeTeam = await this.model.findAll(
      { where: { inProgress: false },
        include: [
          {
            model: SequelizeTeams,
            as: 'homeTeam',
            attributes: { exclude: ['id'] },
          },
          {
            model: SequelizeTeams,
            as: 'awayTeam',
            attributes: { exclude: ['id'] },
          },
        ],
      },
    );

    if (!homeTeam) return null;

    return homeTeam;
  }
}
