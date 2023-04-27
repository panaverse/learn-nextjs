import { ethers } from "hardhat";


async function main() {
  

  const Constructor1 = await ethers.getContractFactory("Constructor");
  const constructors = await Constructor1.deploy(200);

  await constructors.deployed();

  console.log(
    `Deployed to ${constructors.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});