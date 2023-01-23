import { createSlice } from '@reduxjs/toolkit'
import { PoolDataInterface } from 'utils/interfaces'

export const BettingSlice = createSlice({
  name: 'betting',
  initialState: {
    poolData: {
      id: 0,
      endTime: '',
      fee: '',
      leagueName: '',
      matches: [],
      poolName: '',
      reward: '',
      sport: '',
      startTime: '',
      totalMatches: 0,
    } as PoolDataInterface,
  },
  reducers: {
    setPoolsData: (
      state: { poolData: {} },
      action: { payload: [PoolDataInterface] }
    ) => {
      state.poolData = action.payload[0]
    },
  },
})

export const { setPoolsData } = BettingSlice.actions

export default BettingSlice.reducer
