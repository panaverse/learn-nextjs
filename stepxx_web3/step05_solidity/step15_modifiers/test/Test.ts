import { ethers } from "hardhat";

// Test script to check the onlyBy modifier
const { expect } = require("chai");

describe("MyContract", function() {
  let modifier:any;

  beforeEach(async () => {
    const Modifier = await ethers.getContractFactory("Modifier");
    modifier = await Modifier.deploy();
    await modifier.deployed();
  });

  it("should allow the contract owner to call doSomething()", async function() {
    await modifier.doSomething(); // This should succeed, since we're calling it as the contract owner
  });

  it("should not allow anyone else to call doSomething()", async function() {
    const [, otherAddress] = await ethers.getSigners();
    await expect(modifier.connect(otherAddress).doSomething()).to.be.revertedWith("Only contract owner can call this function.");
  });
});
