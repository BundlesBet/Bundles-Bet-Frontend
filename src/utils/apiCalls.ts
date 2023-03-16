import { api } from "utils";

// eslint-disable-next-line import/no-cycle
import axios from "./axios";

const userRoute = "/users";
const bettingRoute = "/betting";
const leaderboardRoute = "/leaderboard";

export const ignoreRoutes = [
  `${userRoute}/createUser`,
  `${userRoute}/getUserByWalletAddress`,
];

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

export const saveUserData = async (body: object) => {
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

export const fetchSportLeagueData = async () => {
  const [response, error] = await api(
    axios.get(`${bettingRoute}/fetchSportLeagueData`)
  );
  return apiCall(response, error);
};

export const fetchLeagues = async (sportName: string) => {
  const [response, error] = await api(
    axios.get(`${bettingRoute}/fetchLeagues?sportName=${sportName}`)
  );
  return apiCall(response, error);
};

export const getPoolOfSport = async (
  sportName: string,
  leagueName: string,
  status: string
) => {
  const [response, error] = await api(
    axios.get(
      `${bettingRoute}/getPools/${status}?sportName=${sportName}&leagueName=${leagueName}`
    )
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

export const cancelBet = async (body: object) => {
  const [response, error] = await api(
    axios.post(`${bettingRoute}/cancelBet`, body)
  );
  return apiCall(response, error);
};

export const getUserBets = async (userId: number) => {
  const [response, error] = await api(
    axios.get(`${userRoute}/getUserBets/${userId}`)
  );
  return apiCall(response, error);
};

export const fetchBetMatches = async (body: object) => {
  const [response, error] = await api(
    axios.post(`${userRoute}/fetchBetMatches`, body)
  );
  return apiCall(response, error);
};

export const updateUserRewards = async (body: {
  userId: number;
  reward: number;
}) => {
  const [response, error] = await api(
    axios.post(`${userRoute}/updateUserRewards`, body)
  );
  return apiCall(response, error);
};

export const deleteSession = async () => {
  const [response, error] = await api(
    axios.delete(`${userRoute}/deleteSession`)
  );
  return apiCall(response, error);
};
