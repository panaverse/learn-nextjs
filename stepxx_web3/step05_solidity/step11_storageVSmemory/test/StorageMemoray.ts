import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("StorageMemoray", function () {
  let storageMemoray: Contract;

  beforeEach(async function () {
    const StorageMemoray = await ethers.getContractFactory("StorageMemoray");
    storageMemoray = await StorageMemoray.deploy();
    await storageMemoray.deployed();
  });

  it("Should modify array in memory and not affect original storage array", async function () {

    await storageMemoray.memoryFun();
    expect(await storageMemoray.students(0)).to.equal("Wania"); //actual array doesnot modify here

  });

  it("Should modify array in storage and affect original storage array", async function () {

    await storageMemoray.storageFun();
    expect(await storageMemoray.students(0)).to.equal("Zain"); //actual array replaced by zain
  });
});
