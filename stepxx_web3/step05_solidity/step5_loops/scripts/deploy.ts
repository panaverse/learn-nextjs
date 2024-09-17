import { ethers } from "hardhat";


async function main() {
  

  const Loops = await ethers.getContractFactory("Loops");
  const loops = await Loops.deploy();

  await loops.deployed();

  console.log(
    `Deployed to ${loops.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
