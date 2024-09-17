import { ethers } from "hardhat";


async function main() {
  

  const Identity = await ethers.getContractFactory("Identity");
  const identity = await Identity.deploy();

  await identity.deployed();

  console.log(
    `Deployed to ${identity.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
