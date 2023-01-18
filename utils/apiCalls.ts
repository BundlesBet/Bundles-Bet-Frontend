import { api } from 'utils'
import axios from './axios'
import { userData } from './interfaces'

const authRoute = '/auth'
const userRoute = '/users'

const apiCall = async (response: any, error: any) => {
  try {
    if (error) return { error: true, ...error.response.data }
    else if (response.data.error) return { ...response.data }
    else {
      return { ...response.data, error: false }
    }
  } catch (error) {
    console.log(error)
    return { error: true }
  }
}

export const saveUserData = async (body: userData) => {
  const [response, error] = await api(
    axios.post(`${userRoute}/createUser`, body)
  )
  return apiCall(response, error)
}

export const getUserDataByWalletAddress = async (walletAddress: string) => {
  const [response, error] = await api(
    axios.get(`${userRoute}/getUserByWalletAddress/${walletAddress}`)
  )
  return apiCall(response, error)
}

export const getPoolOfSport = async (sportName: string) => {
  const [response, error] = await api(
    axios.get(`/betting/getPools?sportName=${sportName}`)
  )
  return apiCall(response, error)
}

export const getMatchesOfPool = async (poolId: Number) => {
  const [response, error] = await api(
    axios.get(`/betting/getPoolMatches?poolId=${poolId}`)
  )

  return apiCall(response, error)
}

export const createBet = async (body: any) => {}
