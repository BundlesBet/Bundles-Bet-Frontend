// Libraries
import { toast } from 'react-toastify'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'

import theme from 'themes/theme'
import store from 'redux/store'

// Styles
import 'styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

// Contexts
import MetamaskProvider from './../contexts/Metamask'
toast.configure({ theme: 'colored', limit: 2 })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MetamaskProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </MetamaskProvider>
  )
}

export default MyApp
