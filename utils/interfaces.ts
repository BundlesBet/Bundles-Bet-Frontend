export interface registerUserInterface {
  error: boolean;
  message: string;
  user: null | {
    _id: string;
    email: string;
    password: string;
    walletAddress: string;
  };
  access_token: string;
}

export interface loginUserInterface {
  error: boolean;
  message: string;
  user: null | {
    _id: string;
    email: string;
    password: string;
    walletAddress: string;
  };
  access_token: string;
}
