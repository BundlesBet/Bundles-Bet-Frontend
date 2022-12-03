// Libraries
import type { NextPage } from "next";

// Styles
import classes from "../styles/Home.module.scss";

// Contexts
import { useMetamask } from "./../contexts/Metamask";

const Home: NextPage = () => {
  const { account, connect, disconnect } = useMetamask();

  return (
    <div className={classes.container}>
      {account ? (
        <p>connected to {account}</p>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
      {account && <button onClick={disconnect}>Disconnect</button>}
    </div>
  );
};

export default Home;
