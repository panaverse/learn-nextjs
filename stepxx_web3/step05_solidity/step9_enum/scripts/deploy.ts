import { ethers } from "hardhat";


async function main() {
  

  const Enum = await ethers.getContractFactory("Enum");
  const enum1 = await Enum.deploy();

  await enum1.deployed();

  console.log(
    `Deployed to ${enum1.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
