import { expect } from "chai";
import { ethers } from "hardhat";

describe("loopscontract", function () {
  let loopscontract: any;

  beforeEach(async function () {
    const LoopsContract = await ethers.getContractFactory("loopscontract");
    loopscontract = await LoopsContract.deploy();
    await loopscontract.deployed();
  });

  describe("loopone", function () {
    it("should loop through the array and assign values", async function () {
      await loopscontract.loopone();
      expect(await loopscontract.arr(0)).to.equal(0);
      expect(await loopscontract.arr(1)).to.equal(1);
      expect(await loopscontract.arr(2)).to.equal(2);
    });
  });

  describe("looptwo", function () {
    it("should loop through the array and assign values", async function () {
      await loopscontract.looptwo();
      expect(await loopscontract.arr(0)).to.equal(0);
      expect(await loopscontract.arr(1)).to.equal(1);
      expect(await loopscontract.arr(2)).to.equal(2);
    });
  });
});
