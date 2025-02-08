import { ethers } from "hardhat";


async function main() {
  

  const Variable = await ethers.getContractFactory("Variable");
  const varaible = await Variable.deploy();

  await varaible.deployed();

  console.log(
    `Deployed to ${varaible.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
