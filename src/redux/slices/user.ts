import { createSlice } from "@reduxjs/toolkit";

import type { SportsListType } from "utils";
import type { UserData } from "utils/interfaces";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    userData: {
      id: 0,
      walletAddress: "",
      emailAddress: "",
      name: "",
      profilePic: null,
      balance: 0,
      totalRewardsEarned: 0,
      totalPoolsParticipated: 0,
    } as UserData, // user data
    // ? check - why sportSelected is an array
    sportSelected: {} as SportsListType, // sport selected
  },
  reducers: {
    setUserData: (
      state: { userData: UserData },
      action: { payload: UserData }
    ) => {
      state.userData = action.payload;
    },
    setSportSelected: (state, action) => {
      state.sportSelected = action.payload;
    },
  },
});

export const { setUserData, setSportSelected } = UserSlice.actions;

export default UserSlice.reducer;
