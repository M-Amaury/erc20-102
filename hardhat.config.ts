import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

<<<<<<< HEAD
const PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY || "";
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";
=======
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const SEPOLIA_RPC_URL = process.env.RPC_URL || "";
>>>>>>> 4a53aaa78be0bc3bed6d145aa3bcd3e15bc475a8
const ARB_SEPOLIA_URL = process.env.ARB_SEPOLIA_URL || "";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: ARB_SEPOLIA_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    arbitrum_sepolia: {
      url: ARB_SEPOLIA_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
<<<<<<< HEAD
    apiKey: process.env.ARBISCAN_API_KEY, 
  },
=======
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY || "",
      arbitrumSepolia: process.env.ARBISCAN_API_KEY || "",
    },
  }
>>>>>>> 4a53aaa78be0bc3bed6d145aa3bcd3e15bc475a8
};

export default config;
