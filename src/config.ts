import { polygon, polygonMumbai } from "wagmi/chains";

import { abi, contractName } from "./abis/BettingPools.json";
import { abi as BundTokenABI } from "./abis/BundToken.json";

const allowedChain =
  process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
    ? [polygonMumbai]
    : [polygon];

export const contractDetails = {
  betting: {
    address: "0xb2dD6D6A5804d3B5eaEFD9C3e2E9B9e6f978e514",
    abi,
    name: contractName,
    chainId: allowedChain[0].id,
  },
  bundToken: {
    address: "0xda5c6f1D5F0445451cC2E53AA2CDEEC9309C8864",
    abi: BundTokenABI,
    name: "BUND",
    chainId: allowedChain[0].id,
  },
};
