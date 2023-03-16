import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import type { ThemeOptions } from "@rainbow-me/rainbowkit/dist/themes/baseTheme";
import type { AppProps } from "next/app";
import Head from "next/head";
// import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import { Provider } from "react-redux";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai, polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";

import defaultSEOConfig from "../../next-seo.config";
import { Chakra } from "lib/components/Chakra";
import Layout from "lib/layout";
import "lib/styles/globals.css";
// import Footer from "lib/layout/Footer";
import store from "redux/store";
// import { urls } from "utils";

const { chains, provider, webSocketProvider } = configureChains(
  [
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [polygonMumbai]
      : [polygon]),
  ],
  [
    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: "xqBUec8hwYcXLPpMua9lzav4spEPGcn6",
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "BundlesBets",
  chains,
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
  webSocketProvider,
});

const theme: ThemeOptions = {
  accentColor: "#0EB634",
  accentColorForeground: "black",
  borderRadius: "small",
  fontStack: "system",
  overlayBlur: "small",
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  // const loginRoutes = [urls.viewPool];

  // const router = useRouter();

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        coolMode
        modalSize="wide"
        showRecentTransactions
        theme={darkTheme(theme)}
        chains={chains}
      >
        <Provider store={store}>
          <Chakra>
            <Head>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
              />
            </Head>
            <DefaultSeo {...defaultSEOConfig} />
            {/* {loginRoutes.includes(router.pathname) ? (
              <>
                <Component {...pageProps} />
                <Footer />
              </>
            ) : (
              <>
                {" "}
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </>
            )} */}
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Chakra>
        </Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
