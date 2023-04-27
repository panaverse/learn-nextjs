import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Struct", function () {
    let enumContract: Contract;

  beforeEach(async function () {
    const Enum = await ethers.getContractFactory("Enum");
    enumContract = await Enum.deploy();
    await enumContract.deployed();
  });

  it("Should get initial user correctly - get values", async function () {
    const result = await enumContract.u1();
    expect(result).to.equal(0);
  });

  it("Should change owner to not_allowed and prevent lottery", async function () {
    await enumContract.changeOwner();
    await enumContract.owner();
    const res2 = await enumContract.lottery();
    expect(res2).to.equal(1000); //// lottery should not be given if owner is not allowed
    const res3 = await enumContract.u1();
    expect(res3).to.equal(1); //check the updated value of u1

  });
});  