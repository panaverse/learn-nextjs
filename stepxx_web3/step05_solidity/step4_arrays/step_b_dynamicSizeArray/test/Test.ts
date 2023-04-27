
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Dynamic Array", function () {
  let array:any;

  beforeEach(async function () {
    const Array = await ethers.getContractFactory("DynamicArray");
    array = await Array.deploy();
    await array.deployed();
  });

  it("Should return the Push Value of Dynamic Array", async function () {

    await array.pushElement(24);
    await array.pushElement(34);
    await array.pushElement(44);
    expect(await array.arr(0)).to.equal(24);
    expect(await array.arr(1)).to.equal(34);
    expect(await array.arr(2)).to.equal(44);

    const length = await array.lengthArr();
    expect(length).to.equal(3);

    //return an element of an array at particular index
    await array.getArr(0);
    await array.getArr(1);
    await array.getArr(2);
  }); 

  it("Should Pop the element of an array", async function () {
    await array.pushElement(10);
    await array.pushElement(20);

    const length = await array.lengthArr();
    expect(length).to.equal(2);

    await array.popElement();

    const length1 = await array.lengthArr();
    expect(length1).to.equal(1);

    await array.getArr(0);
    // await array.getArr(1);
    // await array.getArr(2);
    
  })

  

});

