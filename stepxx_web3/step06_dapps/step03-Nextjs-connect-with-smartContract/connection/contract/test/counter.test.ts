import { expect } from "chai";
import { ethers } from "hardhat";

describe("counter", function () {
  let counter: any;

  beforeEach(async function () {
    const ViewPure = await ethers.getContractFactory("counter");
    counter = await ViewPure.deploy();
    await counter.deployed();
  });

  it("Should return the initial count value of 0", async function () {
    const countvalue = await counter.getCount();
    expect(countvalue).to.equal(0);
  });

  it("Should increment the count value", async function () {
    await counter.incrementCount();
    expect(await counter.getCount()).to.equal(1);
  });

  it("Should reset the count value to 0", async function () {
    await counter.incrementCount();
    await counter.resetCount();
    expect(await counter.getCount()).to.equal(0);
  });
});
