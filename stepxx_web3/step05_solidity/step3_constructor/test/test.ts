
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Constructor", function () {
  let constructor:any;

  beforeEach(async function () {
    const Constructor = await ethers.getContractFactory("Constructor");
    constructor = await Constructor.deploy(200);
    await constructor.deployed();
  });

  it("Should return the constructor value of count", async function () {
    const value = await constructor.getter();
    expect(value).to.equal(200);
  })
 
});
