import { getContractInstance } from "./ethereum";
import contractABI from "../contract/artifacts/contracts/Lock.sol/viewpure.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const fetchData = async () => {
  try {
    const contractInstance = getContractInstance(contractABI, contractAddress);
    console.log(contractInstance);
    const data = await contractInstance.getter(); // Replace 'someFunction' with a function from your smart contract
    console.log("contract data", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
