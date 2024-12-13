import { ethers } from "hardhat";


async function main() {
  

  const Modifier = await ethers.getContractFactory("Modifier");
  const modifierVal = await Modifier.deploy();

  await modifierVal.deployed();

  console.log(
    `Deployed to ${modifierVal.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
