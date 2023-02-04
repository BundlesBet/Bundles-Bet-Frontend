import { api } from "utils";

import axios from "./axios";
import type { UserData } from "./interfaces";

const userRoute = "/users";
const bettingRoute = "/betting";
const leaderboardRoute = "/leaderboard";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const apiCall = async (response: any, error: any) => {
  try {
    if (error) return { error: true, ...error.response.data };
    if (response.data.error) return { ...response.data };

    return { ...response.data, error: false };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return { error: true };
  }
};

export const saveUserData = async (body: UserData) => {
  const [response, error] = await api(
    axios.post(`${userRoute}/createUser`, body)
  );
  return apiCall(response, error);
};

export const getUserDataByWalletAddress = async (walletAddress: string) => {
  const [response, error] = await api(
    axios.get(`${userRoute}/getUserByWalletAddress/${walletAddress}`)
  );
  return apiCall(response, error);
};

export const getSports = async () => {
  const [response, error] = await api(axios.get("/admin/getSports"));
  return apiCall(response, error);
};

export const getPoolOfSport = async (sportName: string) => {
  const [response, error] = await api(
    axios.get(`${bettingRoute}/getPools?sportName=${sportName}`)
  );
  return apiCall(response, error);
};

export const getMatchesOfPool = async (poolId: number) => {
  const [response, error] = await api(
    axios.get(`${bettingRoute}/getPoolMatches?poolId=${poolId}`)
  );

  return apiCall(response, error);
};

export const createBet = async (body: object) => {
  const [response, error] = await api(
    axios.post(`${bettingRoute}/createBet`, body)
  );

  return apiCall(response, error);
};

export const getLeaderboard = async (poolId: number) => {
  const [response, error] = await api(
    axios.get(`${leaderboardRoute}/getPoolLeaderboard/${poolId}`)
  );

  return apiCall(response, error);
};
