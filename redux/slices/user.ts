import { createSlice } from '@reduxjs/toolkit'

import { userData } from 'utils/interfaces'

export const UserSlicce = createSlice({
  name: 'user',
  initialState: {
    userData: {},
  },
  reducers: {
    setUserData: (state: { userData: {} }, action: { payload: userData }) => {
      state.userData = action.payload
    },
  },
})

export const { setUserData } = UserSlicce.actions

export default UserSlicce.reducer
