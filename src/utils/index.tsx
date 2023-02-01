/**
 * @File <Required Utility function in Common>
 */

import { FaBasketballBall } from "react-icons/fa";
import { IoAmericanFootballSharp } from "react-icons/io5";
import {
  MdSportsBaseball,
  MdSportsHockey,
  MdSportsSoccer,
} from "react-icons/md";

// Required URLs
export const urls = {
  admin: "/admin",
  connectWallet: "/",
  login: "/login",
  sportsSelection: "/sportSelection",
  viewPool: "/view-pool",
  dashboard: "/dashboard",
  storyBook: "/storybook",
  explore: "/explore",
  dailyFantasy: "/dailyfantasy",
};

export const api = async (AxiosObj: object) => {
  try {
    const data = await AxiosObj;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export interface SportsListType {
  icon: string;
  sportName: string;
  id: number;
  value: string;
}

export const sportsList = [
  {
    icon: IoAmericanFootballSharp,
    sportName: "NFL",
    id: 1,
    value: "Football",
  },
  {
    icon: MdSportsBaseball,
    sportName: "NBA",
    img: "NBA",
    id: 2,
    value: "Baseball",
  },
  {
    icon: FaBasketballBall,
    sportName: "NCAAM",
    id: 3,
    value: "Basketball",
  },
  {
    icon: MdSportsSoccer,
    sportName: "Soccer",
    id: 4,
    value: "Soccer",
  },
  {
    icon: MdSportsHockey,
    sportName: "NHL",
    id: 5,
    value: "Hockey",
  },
];

export const matches = [
  {
    teamA: "Canada",
    teamB: "Greece",
    bets: 12345,
  },
  {
    teamA: "USA",
    teamB: "Germany",
    bets: 12345,
  },
  {
    teamA: "India",
    teamB: "China",
    bets: 12345,
  },
];
