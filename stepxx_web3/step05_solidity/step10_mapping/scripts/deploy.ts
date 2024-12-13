import { ethers } from "hardhat";


async function main() {
  

  const Mapping = await ethers.getContractFactory("Mapping");
  const mapping = await Mapping.deploy();

  await mapping.deployed();

  console.log(
    `Deployed to ${mapping.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
