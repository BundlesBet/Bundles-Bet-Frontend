export interface userData {
  id?: number
  name: string
  balance: number
  emailAddress?: string
  walletAddress: string
  profilePicture?: string | null
  betsPlaced: Array<object>
  poolId: Array<object>
  totalRewardsEarned: number
  totalPoolsParticipated: number
}

export interface registerUserInterface {
  error: boolean
  message: string
  user: null | {
    _id: string
    email: string
    walletAddress: string
  }
}

export interface loginUserInterface {
  error: boolean
  message: string
  user: null | {
    _id: string
    email: string
    walletAddress: string
  }
}

export interface SportsDataInterface {
  error: boolean
  sportsData: {
    count: number
    items: { $ref: string; name: string; slug: string }[]
    pageCount: number
    pageIndex: number
    pageSize: number
  }
}

export interface PoolDataInterface {
  id: number
  endTime: string
  fee: string
  leagueName: string
  matches: Array<object>
  poolName: string
  reward: string
  sport: string
  startTime: string
  totalMatches: number
}
