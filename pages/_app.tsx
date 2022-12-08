// Libraries
import { toast } from 'react-toastify'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material'

import theme from 'themes/theme'
import store from 'redux/store'

// Styles
import 'styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

// Contexts
import MetamaskProvider from './../contexts/Metamask'
import Layout from 'components/Layout'
import { urls } from 'utils'
import { useRouter } from 'next/router'
import Footer from 'components/Layout/Footer'
toast.configure({ theme: 'colored', limit: 2 })

type AppProps = {
  Component: any
  pageProps: any
}
function MyApp({ Component, pageProps }: AppProps) {
  const loginRoutes = [urls.connectWallet]
  const router = useRouter()
  return (
    <MetamaskProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
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
    </MetamaskProvider>
  )
}

export default MyApp
