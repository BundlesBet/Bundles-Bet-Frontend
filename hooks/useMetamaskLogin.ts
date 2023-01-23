import { useDispatch } from 'react-redux'

import { setUserData } from 'redux/slices/user'
import { getUserDataByWalletAddress } from 'utils/apiCalls'
import { useAccount } from 'wagmi'

export default function useWagmiLogin() {
  const dispatch = useDispatch()
  const { isConnected, address }: any = useAccount()

  const login = async () => {
    const signedData = await (window as any).ethereum?.request({
      method: 'personal_sign',
      params: [
        JSON.stringify(
          'Welcome to BundlesBets. Sign the message to proceed further.'
        ),
        isConnected,
      ],
    })

    console.log(
      '🚀 ~ file: Metamask.tsx:81 ~ signedData ~ signedData',
      signedData
    )

    // api call to fetch user data
    // if it exists, we set it in redux user state
    // else we ask user to enter info

    const userData = await getUserDataByWalletAddress(address)
    console.log(userData)
    delete userData.error

    if (userData != null) {
      dispatch(setUserData(userData as any))
      return true
    } else {
      return false
    }
  }

  return { login }
}
