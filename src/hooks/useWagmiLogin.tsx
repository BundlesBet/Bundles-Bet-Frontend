/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { useAccount } from "wagmi";

import { setUserData } from "redux/slices/user";
import { getUserDataByWalletAddress } from "utils/apiCalls";

export default function useWagmiLogin() {
  const dispatch = useDispatch();
  const { address }: any = useAccount();

  const login = async () => {
    const userData = await getUserDataByWalletAddress(address);

    delete userData.error;

    if (userData.user != null) {
      dispatch(setUserData(userData.user as any));
      return true;
    }
    return false;
  };

  return { login };
}
