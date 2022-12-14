import { createSlice } from '@reduxjs/toolkit'

import { sportsListType } from 'utils'
import { userData } from 'utils/interfaces'

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {
      id: 0,
      name: '',
      balance: 0,
      emailAddress: '',
      walletAddress: '',
      profilePicture: null,
      betsPlaced: [],
      poolId: [],
      totalRewardsEarned: 0,
      totalPoolsParticipated: 0,
    } as userData, // user data
    // ? check - why sportSelected is an array
    sportSelected: {} as sportsListType, // sport selected
  },
  reducers: {
    setUserData: (state: { userData: {} }, action: { payload: userData }) => {
      state.userData = action.payload
    },
    setSportSelected: (state, action) => {
      console.log(action)

      state.sportSelected = action.payload
      // if (action.payload.length === 0) {
      //   state.sportSelected = []
      // } else {
      //   const sportIdSelected = action.payload

      //   // check if sport exists or not
      //   const sportsExists = (
      //     state.sportSelected! as Array<sportsListType>
      //   ).some((sport: sportsListType) => sport.id === sportIdSelected)

      //   if (sportsExists) {
      //     // if sport exists, then we remove
      //     const sportsToKeep = (
      //       state.sportSelected! as Array<sportsListType>
      //     ).filter((sport: sportsListType) => sport.id !== sportIdSelected)
      //     ;(state.sportSelected as sportsListType[]) = [...sportsToKeep]
      //   } else {
      //     // else we add the sport
      //     const sportSelected = (
      //       state.sportSelected! as Array<sportsListType>
      //     ).filter((sport: sportsListType) => sport.id === sportIdSelected)
      //     ;(state.sportSelected as sportsListType[]) = [
      //       ...state.sportSelected,
      //       ...sportSelected,
      //     ]
      //   }
      // }
    },
  },
})

export const { setUserData, setSportSelected } = UserSlice.actions

export default UserSlice.reducer
