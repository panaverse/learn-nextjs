import { expect } from "chai";
import { ethers } from "hardhat";

describe("Enums", function () {
  let Enumscontract: any;

  before(async function () {
    const Conditions = await ethers.getContractFactory("Conditions");
    Enumscontract = await Conditions.deploy();
    await Enumscontract.deployed();
  });

  it("should set lottery value", async function () {
    const result = await Enumscontract.owner();
    expect(result).to.equal("greater than 0");
  });
});
