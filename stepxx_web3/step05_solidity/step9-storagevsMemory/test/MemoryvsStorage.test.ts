import { expect } from "chai";
import { ethers } from "hardhat";

describe("MemoryvsStorage", function () {
  let MemoryvsStorage: any;
  beforeEach(async function () {
    const ViewPure = await ethers.getContractFactory("MemoryvsStorage");
    MemoryvsStorage = await ViewPure.deploy();
    await MemoryvsStorage.deployed();
  });

  it("should change first index of student to amna in local memory", async function () {
    await MemoryvsStorage.mem();
    expect(await MemoryvsStorage.student(0)).to.equal("hira");
  });

  it("should change first index of student to amna in storage memory", async function () {
    await MemoryvsStorage.stor();
    expect(await MemoryvsStorage.student(0)).to.equal("amna");
  });
});
