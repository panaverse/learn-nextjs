import { ethers } from "hardhat";


async function main() {
  

  const GlobalVar = await ethers.getContractFactory("GlobalVar");
  const globalVar = await GlobalVar.deploy();

  await globalVar.deployed();

  console.log(
    `Deployed to ${globalVar.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
