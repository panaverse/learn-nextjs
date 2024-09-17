import { ethers } from "hardhat";


async function main() {
  

  const Functions = await ethers.getContractFactory("Functions");
  const functions = await Functions.deploy();

  await functions.deployed();

  console.log(
    `Deployed to ${functions.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
