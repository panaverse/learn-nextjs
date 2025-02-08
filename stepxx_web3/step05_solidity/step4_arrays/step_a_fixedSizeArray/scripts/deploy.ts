import { ethers } from "hardhat";


async function main() {
  

  const Array = await ethers.getContractFactory("Array");
  const array = await Array.deploy();

  await array.deployed();

  console.log(
    `Deployed to ${array.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
