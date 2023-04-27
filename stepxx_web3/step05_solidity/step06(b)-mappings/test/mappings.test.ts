import { expect } from "chai";
import { ethers } from "hardhat";

describe("mappings", function () {
  let mappings: any;

  beforeEach(async function () {
    const Mappings = await ethers.getContractFactory("mappings");
    mappings = await Mappings.deploy();
    await mappings.deployed();
  });

  it("should set the value of a roll number", async function () {
    const rollNumber = 2;
    const value = "hira";
    await mappings.setter(rollNumber, value);
    expect(await mappings.roll_no(rollNumber)).to.equal(value);
  });
});
