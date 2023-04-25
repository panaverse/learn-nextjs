import { expect } from "chai";
import { ethers } from "hardhat";

describe("gettersetter", function () {
  let gettersetter: any;

  this.beforeEach(async function () {
    await ethers.getSigners();
    const contractFactory = await ethers.getContractFactory("gettersetter");
    gettersetter = await contractFactory.deploy();
    await gettersetter.deployed();
  });

  it("it should initialize count to 0", async function () {
    expect(await gettersetter.count()).to.equal(0);
  });
});
