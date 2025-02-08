import { ethers } from "hardhat";


async function main() {
  

  const ByteFixedArray = await ethers.getContractFactory("ByteFixedArray");
  const byteFixedArray = await ByteFixedArray.deploy();

  await byteFixedArray.deployed();

  console.log(
    `Deployed to ${byteFixedArray.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
