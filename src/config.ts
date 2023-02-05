import { polygon, polygonMumbai } from "wagmi/chains";

import { abi, contractName } from "./abis/BettingPools.json";

const allowedChain =
  process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
    ? [polygonMumbai]
    : [polygon];

export const contractDetails = {
  betting: {
    address: "0x6E93fa46deB33F9774e2c252c23706dCD3957794",
    abi,
    name: contractName,
    chainId: allowedChain[0].id,
  },
};
