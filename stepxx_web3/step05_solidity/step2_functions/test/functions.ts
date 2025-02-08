import { expect } from "chai";
import { ethers } from "hardhat";


describe("Variables in solidity", function () {
  it("Should return a value of function", async function () {
    const Functions = await ethers.getContractFactory("Functions");
    const functions = await Functions.deploy();
    await functions.deployed();

    //getter function result
    const getter = await functions.getter();
    expect(getter).to.equal(10);

    //setter function result
    const setter = await functions.setter();
    const getter2 = await functions.getter();
    expect(getter2).to.equal(11);

    //setAge function result
    await functions.setterAge(55);
    const setAge = await functions.getter();
    expect(setAge).to.equal(55);
    
    const rollNumber = await functions.pureFunction();
    expect(rollNumber).to.equal(100);
  });
});