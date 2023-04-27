import { ethers } from "hardhat";


async function main() {
  

  const EventExample = await ethers.getContractFactory("EventExample");
  const eventExample = await EventExample.deploy();

  await eventExample.deployed();

  console.log(
    `Deployed to ${eventExample.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
