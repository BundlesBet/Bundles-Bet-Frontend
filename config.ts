// Abis
import ERC20ABI from "./abis/ERC20.json";
import ERC721ABI from "./abis/ERC721.json";

// Types
import { ERC20 } from "./types/ERC20";
import { ERC721 } from "./types/ERC721";
import { AllowedChainConfig, ContractConfig } from "./types/config";

export const allowedChains: AllowedChainConfig[] = [
  { id: 80001, name: "Polygon" },
];

export const contractAddress = {
  ERC20: "",
  ERC721: "",
};

export const contracts: ContractConfig[] = [
  { name: "ERC20", abi: ERC20ABI, address: contractAddress.ERC20 },
  { name: "ERC721", abi: ERC721ABI, address: contractAddress.ERC721 },
];

export interface ContractInstances {
  ERC20: ERC20;
  ERC721: ERC721;
}
