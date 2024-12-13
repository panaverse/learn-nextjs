import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Dynamic Array", function () {
  let dynamicArray: Contract;

  beforeEach(async function () {
    const DynamicArray = await ethers.getContractFactory("bytesDynamicArray");
    dynamicArray = await DynamicArray.deploy();
    await dynamicArray.deployed();
  });

  it("Should push an element to the dynamic array", async function () {
    await dynamicArray.pushElement();
    expect(await dynamicArray.dynamicArr()).to.equal("0x61626364");
    await dynamicArray.getDynamicArr();
  });

  it("Should return a single element at particular index", async function () {
    await dynamicArray.pushElement();
    // expect(await dynamicArray.dynamicArr()).to.equal("0x61626364");
    // await dynamicArray.getElement(0);
    expect(await dynamicArray.getElement(0)).to.equal("0x61");
  });
});
