import { configureStore, combineReducers } from '@reduxjs/toolkit'

import UserSlice from './slices/user'
import BettingSlice from './slices/betting'

const store = configureStore({
  reducer: combineReducers({
    user: UserSlice,
    betting: BettingSlice,
  }),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
