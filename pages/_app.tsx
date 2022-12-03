// Libraries
import type { AppProps } from "next/app";

// Styles
import "../styles/globals.scss";

// Contexts
import MetamaskProvider from "./../contexts/Metamask";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MetamaskProvider>
      <Component {...pageProps} />
    </MetamaskProvider>
  );
}

export default MyApp;
