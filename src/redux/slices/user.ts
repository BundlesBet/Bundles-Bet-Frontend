/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */
import { createSlice } from "@reduxjs/toolkit";

import type { SportsListType } from "utils";
import type { userData } from "utils/interfaces";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    userData: {
      id: 0,
      name: "",
      balance: 0,
      emailAddress: "",
      walletAddress: "",
      profilePicture: null,
      betsPlaced: [],
      poolId: [],
      totalRewardsEarned: 0,
      totalPoolsParticipated: 0,
    } as userData, // user data
    // ? check - why sportSelected is an array
    sportSelected: {} as SportsListType, // sport selected
  },
  reducers: {
    setUserData: (state: { userData: {} }, action: { payload: userData }) => {
      state.userData = action.payload;
    },
    setSportSelected: (state, action) => {
      state.sportSelected = action.payload;
    },
  },
});

export const { setUserData, setSportSelected } = UserSlice.actions;

export default UserSlice.reducer;
