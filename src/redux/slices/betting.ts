import { createSlice } from "@reduxjs/toolkit";

import type { PoolDataInterface } from "utils/interfaces";

export const BettingSlice = createSlice({
  name: "betting",
  initialState: {
    poolData: {
      id: 0,
      endTime: "",
      fee: "",
      leagueName: "",
      matches: [],
      poolName: "",
      reward: "",
      sport: "",
      startTime: "",
      totalMatches: 0,
    } as PoolDataInterface,
  },
  reducers: {
    setPoolsData: (
      // eslint-disable-next-line @typescript-eslint/ban-types
      state: { poolData: {} },
      action: { payload: [PoolDataInterface] }
    ) => {
      // eslint-disable-next-line prefer-destructuring, no-param-reassign
      state.poolData = action.payload;
    },
  },
});

export const { setPoolsData } = BettingSlice.actions;

export default BettingSlice.reducer;
