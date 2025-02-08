import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("IfElse", function () {
  let ifElse: Contract;

  beforeEach(async function () {
    const IfElse = await ethers.getContractFactory("IfElse");
    ifElse = await IfElse.deploy();
    await ifElse.deployed();
  });

  it("Should return 'Number is greater than 0'", async function () {
    const result = await ifElse.checkValue(5);
    expect(result).to.equal("Number is greater than 0");
  });

  it("Should return 'Number is less than 0'", async function () {
    const result = await ifElse.checkValue(-5);
    expect(result).to.equal("Number is less than 0");
  });

  it("Should return 'Number is equal to 0'", async function () {
    const result = await ifElse.checkValue(0);
    expect(result).to.equal("Number is equal to 0");
  });
});
