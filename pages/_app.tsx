// Libraries
import { toast } from 'react-toastify'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material'

import MUITheme from 'themes/theme'
import store from 'redux/store'

// Styles
import 'styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'
import '@rainbow-me/rainbowkit/styles.css'
import type { ThemeOptions } from '@rainbow-me/rainbowkit/dist/themes/baseTheme'

// Contexts

import { urls } from 'utils'
import { useRouter } from 'next/router'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { polygonMumbai, polygon } from 'wagmi/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit'

import Layout from 'components/Layout'
import Footer from 'components/Layout/Footer'

toast.configure({ theme: 'colored', limit: 2 })

type AppProps = {
  Component: any
  pageProps: any
}

const { chains, provider, webSocketProvider } = configureChains(
  [
    polygon,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [polygonMumbai]
      : []),
  ],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: process.env.NEXT_PUBLIC_PROVIDER!,
      }),
    }),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'BundlesBets Frontend',
  chains,
})

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
  webSocketProvider,
})

const theme: ThemeOptions = {
  accentColor: '#00ffc2',
  accentColorForeground: 'black',
  borderRadius: 'small',
  fontStack: 'system',
  overlayBlur: 'small',
}

function MyApp({ Component, pageProps }: AppProps) {
  const loginRoutes = [urls.connectWallet]
  const router = useRouter()
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        coolMode
        modalSize="compact"
        showRecentTransactions
        theme={darkTheme(theme)}
        chains={chains}
      >
        <Provider store={store}>
          <ThemeProvider theme={MUITheme}>
            {loginRoutes.includes(router.pathname) ? (
              <>
                <Component {...pageProps} />
                <Footer />
              </>
            ) : (
              <>
                {' '}
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </>
            )}
          </ThemeProvider>
        </Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
