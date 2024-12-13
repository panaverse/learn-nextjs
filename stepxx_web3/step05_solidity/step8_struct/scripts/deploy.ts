import { ethers } from "hardhat";


async function main() {
  

  const Struct = await ethers.getContractFactory("Struct");
  const struct = await Struct.deploy(102, "Wania");

  await struct.deployed();

  console.log(
    `Deployed to ${struct.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
