import { useMetamask } from 'contexts/Metamask'

export default function useMetamaskLogin() {
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
  }

  return { login }
}
