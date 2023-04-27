import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/W3-IifbhRvQZcLPXv3-7rWA4H2DDiX8V",
      accounts: [
        "4b8b302f281bdb0056bd49bac791827e447b791526f2403bdb3b6bd7121b3a38",
      ],
    },
  },
};

export default config;
