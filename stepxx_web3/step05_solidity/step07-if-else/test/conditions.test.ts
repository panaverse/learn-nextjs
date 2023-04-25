import { expect } from "chai";
import { ethers } from "hardhat";

describe("conditions", function () {
  let conditions: any;

  beforeEach(async function () {
    const condition = await ethers.getContractFactory("conditions");
    conditions = await condition.deploy();
    await conditions.deployed();
  });

  it("should return 'greater than 0' when input is positive", async function () {
    const result = await conditions.conditional(1);
    expect(result).to.equal("greater than 0");
  });

  it("should return 'equal to zero' when input is zero", async function () {
    const result = await conditions.conditional(0);
    expect(result).to.equal("equal to zero");
  });

  it("should return 'less than zero' when input is negative", async function () {
    const result = await conditions.conditional(-1);
    expect(result).to.equal("less than zero");
  });
});
