import { expect } from "chai";
import { ethers } from "hardhat";

describe("gettersetter", function () {
  let gettersetter: any;

  beforeEach(async function () {
    const GetterSetter = await ethers.getContractFactory("gettersetter");
    gettersetter = await GetterSetter.deploy();
    await gettersetter.deployed();
  });

  it("should return the correct age using the getter function", async function () {
    const age = await gettersetter.getter();
    expect(age).to.equal(10);
  });

  it("should set age to newage using the setter function", async function () {
    await gettersetter.setter(20);
    const age = await gettersetter.getter();
    expect(age).to.equal(20);
  });
});
