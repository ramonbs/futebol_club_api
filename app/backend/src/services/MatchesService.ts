import { IMatch, IMatchModel } from '../Interfaces/Matches/Matches';
import IMatchesModel from '../Interfaces/Matches/MatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchesService {
  constructor(private matchesModel: IMatchesModel) {}

  async getAllMatches(): Promise<ServiceResponse<IMatch[] | string>> {
    const matches = await this.matchesModel.getAllMatches();

    if (!matches) {
      return {
        status: 'notFound',
        data: { message: 'No matches found' },
      };
    }

    return { status: 'successful', data: matches };
  }

  async getMatchesBasedinProgress(
    inProgress?: boolean,
  ): Promise<ServiceResponse<IMatch[] | string>> {
    const matches = await this.matchesModel.getMatchesBasedinProgress(
      inProgress,
    );
    if (!matches) {
      return {
        status: 'notFound',
        data: { message: 'No matches found' },
      };
    }
    return { status: 'successful', data: matches };
  }

  async updateMatchById(id: number) {
    const inProgress = false;
    const newData = { inProgress };
    const updatedMatch = await this.matchesModel.updateMatchById(
      id,
      newData,
    );

    return { status: 'successful', data: { message: updatedMatch } };
  }

  async updateMatchGoalsById(id: number, goals: IMatchModel) {
    const updatedMatch = await this.matchesModel.updateMatchGoalsById(
      id,
      goals,
    );

    return { status: 'successful', data: { message: updatedMatch } };
  }

  async createMatch(match: IMatch) {
    const newMatchData = {
      ...match,
      inProgress: true,
    };
    const newMatch = await this.matchesModel.registerMatch(newMatchData);

    if (!newMatch) {
      return { status: 'notFound', data: { message: 'There is no team with such id!' } };
    }

    return { status: 'created', data: { message: newMatch } };
  }
}
