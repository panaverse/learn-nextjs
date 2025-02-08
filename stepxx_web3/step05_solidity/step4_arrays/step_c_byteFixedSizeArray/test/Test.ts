import { expect } from "chai";
import { ethers } from "hardhat";

describe("Byte Fixed Array", function () {
  let array: any;

  beforeEach(async function () {
    const Array = await ethers.getContractFactory("ByteFixedArray");
    array = await Array.deploy();
    await array.deployed();
  });

  it("Should set and get the byte array", async function(){
    //1st method to pass the parameters using ethers library
    //the hexlify function is used to create byte arrays of the correct size from the given hexadecimal values
    // let item1 = ethers.utils.hexlify([0x61, 0x62]);
    // let item2 = ethers.utils.hexlify([0x65, 0x66, 0x67]);

    //2nd method to pass the parameters
    let item1 = '0x6162';
    let item2 = '0x656667';
    await array.setByteArray(item1, item2);
    expect(await array.arr2()).to.equal("0x6162");
    expect(await array.arr3()).to.equal("0x656667");
    await array.getByteArray();

    // No need to assert anything in this test case as `getByteArray()` just logs to the console
  })

});
