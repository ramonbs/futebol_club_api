import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatch, IMatchModel, IMatchinProgressModel } from '../Interfaces/Matches/Matches';
import IMatchesModel from '../Interfaces/Matches/MatchesModel';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async getAllMatches(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  async getMatchesBasedinProgress(inProgress?: boolean): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: {
        inProgress,
      },
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  async updateMatchById(id: number, match: IMatchinProgressModel): Promise<string> {
    await this.model.update(match, {
      where: {
        id,
      },
    });

    return 'Finished';
  }

  async updateMatchGoalsById(id: number, goals: IMatchModel): Promise<string> {
    await this.model.update(goals, {
      where: {
        id,
      },
    });

    return 'Goals updated';
  }

  async registerMatch(match: IMatch): Promise<IMatch | null> {
    const team1Exists = await this.model.findOne({
      where: {
        homeTeamId: match.homeTeamId,
      },
    });

    const team2Exists = await this.model.findOne({
      where: {
        awayTeamId: match.awayTeamId,
      },
    });

    if (!team1Exists || !team2Exists) return null;

    const newMatch = await this.model.create(match);

    return newMatch;
  }
}
