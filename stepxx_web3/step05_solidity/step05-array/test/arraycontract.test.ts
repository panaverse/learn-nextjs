import { expect } from "chai";
import { ethers } from "hardhat";

describe("arraycontractcontract", function () {
  let arraycontract: any;

  this.beforeEach(async function () {
    // Deploy the arraycontract and get the owner name
    const [owner] = await ethers.getSigners();
    const arraycontractFactory = await ethers.getContractFactory(
      "arraycontract"
    );
    arraycontract = await arraycontractFactory.deploy();
    await arraycontract.deployed();
  });

  it("should set and get element in static arraycontract", async function () {
    // Set and get an element in the static arraycontract
    await arraycontract.setter(2, 50);
    expect(await arraycontract.arr(2)).to.equal(50);
  });

  it("should get the length of the static arraycontract", async function () {
    await arraycontract.length();
    expect(await arraycontract.length()).to.equal(4);
  });

  it("should push and pop element in the dynamic arraycontract", async function () {
    await arraycontract.pushElement(5);
    await arraycontract.pushElement(10);
    await arraycontract.pushElement(15);
    await arraycontract.popElement();
    expect(await arraycontract.arr1(0)).to.equal(5);
  });

  it("should set the byte arraycontract correctly", async function () {
    await arraycontract.setbyte();
    expect(await arraycontract.b2()).to.equal("0x6162");
    expect(await arraycontract.b3()).to.equal("0x616263");
  });

  it("should push an element in the dynamic byte arraycontract", async function () {
    await arraycontract.pushElementbyte();
    expect(await arraycontract.b1()).to.equal("0x61626364");
  });
});
