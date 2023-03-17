export interface UserData {
  id: number;
  walletAddress: string;
  emailAddress: string | null;
  name: string;
  profilePic: string | null;
  balance: number;
  totalRewardsEarned: number;
  totalPoolsParticipated: number;
}

export interface RegisterUserInterface {
  error: boolean;
  message: string;
  user: null | {
    _id: string;
    email: string;
    walletAddress: string;
  };
}

export interface LoginUserInterface {
  error: boolean;
  message: string;
  user: null | {
    _id: string;
    email: string;
    walletAddress: string;
  };
}

export interface SportsDataInterface {
  error: boolean;
  sportsData: {
    count: number;
    items: { $ref: string; name: string; slug: string }[];
    pageCount: number;
    pageIndex: number;
    pageSize: number;
  };
}

export const BetStatusEnum = {
  LOST: "LOST",
  WON: "WON",
  ACTIVE: "ACTIVE",
  CANCELLED: "CANCELLED",
  NOT_STARTED: "NOT_STARTED",
};

export type BetStatus = (typeof BetStatusEnum)[keyof typeof BetStatusEnum];

export const ResultEnum = {
  DRAW: "DRAW",
  TEAM_A: "TEAM_A",
  TEAM_B: "TEAM_B",
  NOT_STARTED: "NOT_STARTED",
};

export type Result = (typeof ResultEnum)[keyof typeof ResultEnum];

export type Pool = {
  id: number;
  sport: string;
  poolName: string;
  leagueName: string;
  startTime: Date | string;
  fee: number;
  protocolFee: number;
  totalMatches: number;
  isArchive: boolean;
  totalPoolAmount: number;
  rewardPercentage: number;
  matches?: Array<ESPNMatch>;
  participants?: Array<object>;
  betEndTime: Date | string;
};

export type PoolWithBets = {
  id: number;
  poolId: number;
  userId: number;
  teamSelections: {
    match: number;
    selection: number;
  };
  betAmount: number;
  predictionAccuracy: number;
  outcomesForMatches: {
    match: number;
    selection: number;
  };
  status: BetStatus;
  pool: Pool;
};

export type ESPNMatch = {
  id: number;
  espnMatchId: number;
  name: string;
  startTime: Date;
  teamA: {
    name: string;
    link: string;
    logo: string;
    value: number;
    teamId: string;
    abbreviation: string;
  };
  teamB: {
    name: string;
    link: string;
    logo: string;
    value: number;
    teamId: string;
    abbreviation: string;
  };
  outcome: Result;
};

export type Bet = {
  id: number;
  poolId: number;
  userId: number;
  teamSelections: {
    match: number;
    selection: number;
  };
  betAmount: number;
  predictionAccuracy: number;
  outcomesForMatches: {
    match: number;
    selection: number;
  };
  status: BetStatus;
};

export type LeaderBoard = {
  positions: Array<{ userId: number; user: UserData; position: number }>;
  rewards: Array<{ userId: number; user: UserData; reward: number }>;
  predictionAccuracy: Array<{
    userId: number;
    user: UserData;
    accuracy: number;
  }>;
};

export type BetMatches = {
  id: number;
  poolId: number;
  userId: number;
  teamSelections: Array<{ match: number; selection: number }>;
  betAmount: number;
  predictionAccuracy: number;
  outcomesForMatches: Array<{ match: number; selection: number }>;
  status: string;
  matches: Array<ESPNMatch>;
  poolName: string;
};

export type BetMatchesTable = {
  teamAName: string;
  teamBName: string;
  selection: string;
  outcome: string;
};

export type PoolMatchesTable = {
  teamAName: string;
  teamBName: string;
  outcome: string;
};
