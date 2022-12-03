// Libraries
import { ThemeProvider } from "@mui/material";
import { toast } from "react-toastify";
import type { AppProps } from "next/app";
import theme from "themes/theme";
import "src/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";

// Styles
import "../styles/globals.scss";

// Contexts
import MetamaskProvider from "./../contexts/Metamask";
toast.configure({ theme: "colored", limit: 2 });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MetamaskProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </MetamaskProvider>
  );
}

export default MyApp;
