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
    } as Pool,
  },
  reducers: {
    setPoolsData: (
      // eslint-disable-next-line @typescript-eslint/ban-types
      state: { poolData: {} },
      action: { payload: [Pool] }
    ) => {
      // eslint-disable-next-line prefer-destructuring, no-param-reassign
      state.poolData = action.payload;
    },
  },
});

export const { setPoolsData } = BettingSlice.actions;

export default BettingSlice.reducer;
