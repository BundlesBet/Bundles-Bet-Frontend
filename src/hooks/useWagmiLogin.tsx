import { useDispatch } from "react-redux";
import { useAccount } from "wagmi";

import { setUserData } from "redux/slices/user";
import { getUserDataByWalletAddress } from "utils/apiCalls";

export default function useWagmiLogin() {
  const dispatch = useDispatch();
  const { address } = useAccount();

  const login = async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userData = await getUserDataByWalletAddress(address!);

    if (userData.user !== null) {
      dispatch(setUserData(userData.user));
      return true;
    }

    return false;
  };

  return { login };
}
