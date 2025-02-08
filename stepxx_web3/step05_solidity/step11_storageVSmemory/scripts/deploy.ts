import { ethers } from "hardhat";


async function main() {
  

  const StorageMemoray = await ethers.getContractFactory("StorageMemoray");
  const storageMemoray = await StorageMemoray.deploy();

  await storageMemoray.deployed();

  console.log(
    `Deployed to ${storageMemoray.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
