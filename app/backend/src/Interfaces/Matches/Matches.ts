export interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchLeaderboardResult {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: {
    id: number;
    name: string;
  };
}

export interface IMatchinProgressModel {
  inProgress: boolean;
}

export interface IMatchModel {
  homeTeamGoals: number;
  awayTeamGoals: number;
}
