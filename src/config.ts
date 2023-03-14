import { polygon, polygonMumbai } from "wagmi/chains";

import { abi, contractName } from "./abis/BettingPools.json";
import { abi as BundTokenABI } from "./abis/BundToken.json";

const allowedChain =
  process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
    ? [polygonMumbai]
    : [polygon];

export const contractDetails = {
  betting: {
    address: "0x91802cD868B3886168716f653E78cb59fd4A259e",
    abi,
    name: contractName,
    chainId: allowedChain[0].id,
  },
  bundToken: {
    address: "0x799fe885481bC32ef946a541ED766a86A933720f",
    abi: BundTokenABI,
    name: "BUND",
    chainId: allowedChain[0].id,
  },
};
