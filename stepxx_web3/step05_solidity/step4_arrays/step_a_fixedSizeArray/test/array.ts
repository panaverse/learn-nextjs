import { expect } from "chai";
import { ethers } from "hardhat";

describe("Array", function () {
  let array: any;

  beforeEach(async function () {
    const Array = await ethers.getContractFactory("Array");
    array = await Array.deploy();
    await array.deployed();
  });

  it("Should return the set value of an array", async function () {
    await array.setValue(3, 14);
    expect(await array.arr(3)).to.equal(14);

    //return the value of an array at particular index
    await array.getArr(3);
  });


  it("Should return the length of the array", async function () {
    const length = await array.lengthArr();
    expect(length).to.equal(4);
  });

});

