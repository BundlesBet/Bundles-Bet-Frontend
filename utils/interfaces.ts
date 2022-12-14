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
