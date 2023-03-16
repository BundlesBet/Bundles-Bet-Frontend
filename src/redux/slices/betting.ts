import { createSlice } from "@reduxjs/toolkit";

import type { Pool } from "utils/interfaces";

export const BettingSlice = createSlice({
  name: "betting",
  initialState: {
    poolData: {
      id: 0,
      sport: "",
      poolName: "",
      leagueName: "",
      startTime: new Date().toString(),
      fee: 0,
      protocolFee: 0,
      totalMatches: 0,
      isArchive: false,
      totalPoolAmount: 0,
      rewardPercentage: 0,
      matches: [],
      betEndTime: "",
    } as Pool,
    sportName: "",
    leagueName: "",
    sportLeagues: [] as Array<{ name: string; slug: string }>,
  },
  reducers: {
    setPoolsData: (state: { poolData: Pool }, action: { payload: Pool }) => {
      state.poolData = action.payload;
    },
    setSportName: (
      state: { sportName: string },
      action: { payload: string }
    ) => {
      state.sportName = action.payload;
    },
    setLeagueName: (
      state: { leagueName: string },
      action: { payload: string }
    ) => {
      state.leagueName = action.payload;
    },
    setSportLeagues: (
      state: { sportLeagues: Array<object> },
      action: { payload: Array<object> }
    ) => {
      state.sportLeagues = action.payload;
    },
  },
});

export const { setPoolsData, setSportName, setLeagueName, setSportLeagues } =
  BettingSlice.actions;

export default BettingSlice.reducer;
