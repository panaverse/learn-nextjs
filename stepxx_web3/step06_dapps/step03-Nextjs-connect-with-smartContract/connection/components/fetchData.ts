import contractABI from "../contract/artifacts/contracts/Lock.sol/counter.json";
import { providers } from "ethers";
const { JsonRpcProvider } = providers;
import { ethers } from "ethers";

const contractAddress = "0x44B41DF2Db6895855497fCd302C7c57C4213a6d1";

export const fetchData = async () => {
  const provider = new JsonRpcProvider(
    "https://goerli.infura.io/v3/e8eefaee0630410ba792a72fadb9ae08"
  );
  try {
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI.abi,
      provider
    );
    const data = await contractInstance.getter();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
