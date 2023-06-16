import { IMatch } from '../Interfaces/Matches/Matches';
import { ILeaderboardEntry, ILeaderboardParams } from '../Interfaces/Leaderboards/Leaderboards';
import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboardService {
  constructor(
    private leaderBoardModel: LeaderboardModel,
  ) {}

  private static LeaderboardConstructor(matches: ILeaderboardParams[]) {
    const leaderboard: { [teamName: string]: ILeaderboardEntry } = {};

    matches.forEach((match) => {
      const homeTeamName = match.homeTeam?.teamName;

      if (homeTeamName !== undefined && !leaderboard[homeTeamName]) {
        leaderboard[homeTeamName] = LeaderboardService.createLeaderboardEntry(homeTeamName);
      }
      if (homeTeamName && leaderboard[homeTeamName]) {
        this.updateLeaderboardEntry(leaderboard[homeTeamName], match);
      }
    });

    return leaderboard;
  }

  private static updateLeaderboardEntry(entry: ILeaderboardEntry, match: ILeaderboardParams) {
    const entryParam = entry;
    entryParam.totalGames += 1;
    entryParam.goalsFavor += match.homeTeamGoals;
    entryParam.goalsOwn += match.awayTeamGoals;
    entryParam.goalsBalance += match.homeTeamGoals - match.awayTeamGoals;

    if (LeaderboardService.isVictory(match)) {
      this.updateVictoryStats(entryParam);
    }

    if (LeaderboardService.isDraw(match)) {
      this.updateDrawStats(entryParam);
    }

    if (LeaderboardService.isLoss(match)) {
      entryParam.totalLosses += 1;
    }
  }

  private static updateVictoryStats(entry: ILeaderboardEntry) {
    const entryParam = entry;

    entryParam.totalPoints += 3;
    entryParam.totalVictories += 1;
  }

  private static updateDrawStats(entry: ILeaderboardEntry) {
    const entryParam = entry;

    entryParam.totalPoints += 1;
    entryParam.totalDraws += 1;
  }

  private static createLeaderboardEntry(name: string): ILeaderboardEntry {
    return {
      name,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
  }

  private static isVictory(match: IMatch): boolean {
    return match.homeTeamGoals > match.awayTeamGoals;
  }

  private static isDraw(match: IMatch): boolean {
    return match.homeTeamGoals === match.awayTeamGoals;
  }

  private static isLoss(match: IMatch): boolean {
    return match.homeTeamGoals < match.awayTeamGoals;
  }

  private static orderLeaderboard(leaderboard: ILeaderboardEntry[]) {
    leaderboard.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;

      return 0;
    });
  }

  private static createLeaderboardEfficiency(leaderboard: ILeaderboardEntry[]) {
    leaderboard.forEach((e) => {
      const entryParam = e;
      entryParam.efficiency = +((entryParam.totalPoints / (entryParam.totalGames * 3)) * 100)
        .toFixed(2);
    });
  }

  async getLeaderboard() {
    const result = await this.leaderBoardModel.getInformationOfHomeTeam() as ILeaderboardParams[];

    if (!result) {
      return { status: 'error', data: 'Internal server error' };
    }
    const leaderboard = LeaderboardService.LeaderboardConstructor(result);

    const leaderboardArray = Object.values(leaderboard);
    LeaderboardService.createLeaderboardEfficiency(leaderboardArray);
    LeaderboardService.orderLeaderboard(leaderboardArray);

    return {
      status: 'successful',
      data: leaderboardArray,
    };
  }
}
