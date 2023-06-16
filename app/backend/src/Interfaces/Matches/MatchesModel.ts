import { IMatch, IMatchModel, IMatchinProgressModel } from './Matches';

export default interface IMatchesModel {
  getAllMatches(inProgress?: boolean): Promise<IMatch[]>;
  getMatchesBasedinProgress(inProgress?: boolean): Promise<IMatch[]>;
  updateMatchById(id: number, match: IMatchinProgressModel): Promise<string>;
  updateMatchGoalsById(id: number, goals: IMatchModel): Promise<string>;
  registerMatch(match: IMatch): Promise<IMatch | null>;
}
