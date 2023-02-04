import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { BettingSlice } from "./slices/betting";
import { UserSlice } from "./slices/user";

const store = configureStore({
  reducer: combineReducers({
    user: UserSlice.reducer,
    betting: BettingSlice.reducer,
  }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
