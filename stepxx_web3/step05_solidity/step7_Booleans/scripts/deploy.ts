import { ethers } from "hardhat";


async function main() {
  

  const Bool = await ethers.getContractFactory("Bool");
  const bool = await Bool.deploy();

  await bool.deployed();

  console.log(
    `Deployed to ${bool.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
