export interface userData {
  _id: string
  userName: string
  emailAddress: string
  walletAddress: string
  profilePicture: string
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
