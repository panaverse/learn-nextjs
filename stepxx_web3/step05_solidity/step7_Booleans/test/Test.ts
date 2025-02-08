import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Bool", function () {
  let bool: Contract;

  beforeEach(async function () {
    const Bool = await ethers.getContractFactory("Bool");
    bool = await Bool.deploy();
    await bool.deployed();
  });

  it("Should set value to true if input is greater than 100", async function () {
    await bool.checkBool(101);
    expect(await bool.value()).to.equal(true); //value is state variable that store boolean value soo we can't access state variables directly so we call them through getter and setter function so here compiler automatically create a getter function for public variable value i.e value() so we are calling a getter function of value() like this
  });

  it("Should set value to false if input is less than or equal to 100", async function () {
    await bool.checkBool(50);
    expect(await bool.value()).to.equal(false);
  });
});
