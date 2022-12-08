import { configureStore, combineReducers } from '@reduxjs/toolkit'

import UserSlice from './slices/user'

const store = configureStore({
  reducer: combineReducers({
    user: UserSlice,
  }),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
