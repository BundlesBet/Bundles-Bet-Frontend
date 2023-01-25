import { useAccount } from 'wagmi'
import { useDispatch } from 'react-redux'

import { setUserData } from 'redux/slices/user'
import { getUserDataByWalletAddress } from 'utils/apiCalls'

export default function useWagmiLogin() {
  const dispatch = useDispatch()
  const { isConnected, address }: any = useAccount()

  const login = async () => {
    const userData = await getUserDataByWalletAddress(address)
    console.log(userData)
    delete userData.error

    if (userData.user != null) {
      dispatch(setUserData(userData.user as any))
      return true
    } else {
      return false
    }
  }

  return { login }
}
