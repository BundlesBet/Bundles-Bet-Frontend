import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAccount, useDisconnect } from "wagmi";

import { setUserData } from "redux/slices/user";
import { saveAuthTokens } from "utils";
import { getUserDataByWalletAddress } from "utils/apiCalls";

export default function useWagmiLogin() {
  const toast = useToast();
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const connectionTime = new Date().getTime() + 1000 * 60 * 59;

  useEffect(() => {
    if (!address) return;
    const interval = setInterval(() => {
      const remainingTime = connectionTime - new Date().getTime();

      if (remainingTime <= 0) {
        toast({
          position: "top-right",
          title: "Session timeout",
          description: "Your session ended, please reconnect your wallet.",
          status: "info",
          duration: 10000,
          isClosable: true,
        });
        disconnect();
        clearInterval(interval);
      }
    }, 10000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const login = async () => {
    // console.log(address, currentAccount);
    // if (currentAccount && address !== currentAccount) {
    //   await deleteSession();
    // }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userData = await getUserDataByWalletAddress(address!);

    // if (Object.keys(userData).length > 1 && userData.user !== null) {
    if (userData.user !== null) {
      // setCurrentAccount(address);
      saveAuthTokens(
        userData.tokens.access.token,
        userData.tokens.refresh.token
      );

      dispatch(setUserData(userData.user));
      return true;
    }

    return false;
  };

  return { login };
}
