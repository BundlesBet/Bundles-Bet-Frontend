import { useDispatch } from 'react-redux'

import { useMetamask } from 'contexts/Metamask'
import { setUserData } from 'redux/slices/user'
import { getUserDataByWalletAddress } from 'utils/apiCalls'

export default function useMetamaskLogin() {
  const dispatch = useDispatch()
  const { account } = useMetamask()

  const login = async () => {
    console.log(account)

    const signedData = await (window as any).ethereum?.request({
      method: 'personal_sign',
      params: [
        JSON.stringify(
          'Welcome to BundlesBets. Sign the message to proceed further.'
        ),
        account,
      ],
    })

    console.log(
      '🚀 ~ file: Metamask.tsx:81 ~ signedData ~ signedData',
      signedData
    )

    // api call to fetch user data
    // if it exists, we set it in redux user state
    // else we ask user to enter info

    const userData = await getUserDataByWalletAddress(account)
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
