import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("GlobalVar", function () {
  let globalVar: Contract;

  beforeEach(async function () {
    const GlobalVar = await ethers.getContractFactory("GlobalVar");
    globalVar = await GlobalVar.deploy();
    await globalVar.deployed();
  });

  it("Should return block number, timestamp, and sender address", async function () {
    const result = await globalVar.getter();

    expect(result.block_num).to.be.gt(0); //It is is a method used to check if the actual value is greater than the expected value. In this case, result.block_num is the actual value, and 0 is the expected value.

    //checks whether the value of result.timestamp is of type "number". If the value is not a number, the test will fail with an assertion error.
    expect(result.timestamp.toNumber()).to.be.a("number");  //doesnot work without converting to .toNumber() because timestamp returns a bigNumber so we have to convert it into number using this function

    const [deployer] = await ethers.getSigners(); //ethers.getSigners() returns an array of Signer objects representing the Ethereum accounts available to interact with the blockchain. The first signer returned in this array is considered the "deployer" in the context of a Hardhat test script.
    expect(result.msgSender).to.equal(deployer.address); //It checks whether the msg.sender returned by the getter function in the GlobalVar contract is equal to the address of the deployer.
  });
});
