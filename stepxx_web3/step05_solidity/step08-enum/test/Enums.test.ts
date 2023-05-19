import { expect } from "chai";
import { ethers } from "hardhat";

describe("Enums", function () {
  let Enumscontract: any;

  before(async function () {
    const Conditions = await ethers.getContractFactory("Enums");
    Enumscontract = await Conditions.deploy();
    await Enumscontract.deployed();
    expect(await Enumscontract.u1()).to.equals(0);
    expect(await Enumscontract.lottery()).to.equal(1000);
  });

  it("should set lottery to 0 if u1 is not_allowed", async function () {
    await Enumscontract.changeOwner();
    await Enumscontract.owners();
    expect(await Enumscontract.lottery()).to.equal(0);
    expect(await Enumscontract.u1()).to.equal(1);
  });
});
