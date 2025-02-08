import { ethers } from "hardhat";


async function main() {
  

  const IfElse = await ethers.getContractFactory("IfElse");
  const ifElse = await IfElse.deploy();

  await ifElse.deployed();

  console.log(
    `Deployed to ${ifElse.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
