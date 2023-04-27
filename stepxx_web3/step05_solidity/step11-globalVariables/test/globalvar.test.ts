import { expect } from "chai";
import { ethers } from "hardhat";

describe("globalvar", function () {
  let globalvar: any;

  beforeEach(async function () {
    const Globalvar = await ethers.getContractFactory("globalvar");
    globalvar = await Globalvar.deploy();
    await globalvar.deployed();
  });

  it("returns the correct block number, timestamp", async function () {
    const result = await globalvar.demso();
    console.log(result);
    // expect(result.block_no).to.be.a("BigNumber");
    // expect(result.timestamp).to.be.a("BigNumber");
  });
});
