import { ethers } from "hardhat";


async function main() {
  

  const Visibility = await ethers.getContractFactory("Visibility");
  const visibility = await Visibility.deploy();

  await visibility.deployed();

  console.log(
    `Deployed to ${visibility.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
