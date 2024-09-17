import { ethers } from "hardhat";


async function main() {
  

  const bytesDynamicArray = await ethers.getContractFactory("bytesDynamicArray");
  const bytesDArray = await bytesDynamicArray.deploy();

  await bytesDArray.deployed();

  console.log(
    `Deployed to ${bytesDArray.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
