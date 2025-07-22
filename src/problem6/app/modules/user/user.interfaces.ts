export interface IUser {
  id: number;
  username: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILeaderboardEntry {
  id: number;
  username: string;
  score: number;
}

export interface ILoginRequest {
  username: string;
}

export interface ILoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    score: number;
  };
}

export interface IScoreUpdateResponse {
  newScore: number;
  rank?: number;
}
