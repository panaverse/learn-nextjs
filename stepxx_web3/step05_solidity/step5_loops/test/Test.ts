import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Loops", function () {
  let loops: Contract;

  beforeEach(async function () {
    const Loops = await ethers.getContractFactory("Loops");
    loops = await Loops.deploy();
    await loops.deployed();
  });

  it("Should set values in array using while loop", async function () {
    await loops.whileLoop();
    expect(await loops.arr(0)).to.equal(0);
    expect(await loops.arr(1)).to.equal(1);
    expect(await loops.arr(2)).to.equal(2);
    // expect(await loops.arr()).to.equal([0, 1, 2]);
  });

  it("Should set values in array using for loop", async function () {
    await loops.forLoop();
    expect(await loops.arr(0)).to.equal(0);
    expect(await loops.arr(1)).to.equal(1);
    expect(await loops.arr(2)).to.equal(2);
    // expect(await loops.arr()).to.equal([0, 1, 2]);
  });

  it("Should set values in array using do-while loop", async function () {
    await loops.doWhileLoop();
    expect(await loops.arr(0)).to.equal(0);
    expect(await loops.arr(1)).to.equal(1);
    expect(await loops.arr(2)).to.equal(2);
    // expect(await loops.arr()).to.equal([0, 1, 2]);
  });
});
