import { ethers } from "ethers";

export const getProvider = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://goerli.infura.io/v3/e8eefaee0630410ba792a72fadb9ae08"
  );
  return provider;
};

export const getContractInstance = (abi: any, contractAddress: any) => {
  const provider = getProvider();
  const contractInstance = new ethers.Contract(contractAddress, abi, provider);
  return contractInstance;
};
