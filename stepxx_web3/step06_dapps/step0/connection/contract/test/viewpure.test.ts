import { expect } from "chai";
import { ethers } from "hardhat";

describe("viewpure", function () {
  let viewpure: any;

  beforeEach(async function () {
    const ViewPure = await ethers.getContractFactory("viewpure");
    viewpure = await ViewPure.deploy();
    await viewpure.deployed();
  });

  it("should return the correct age using the getter function", async function () {
    const age = await viewpure.getter();
    expect(age).to.equal(10);
  });

  it("should set age to newage using the setter function", async function () {
    await viewpure.setter(20);
    const age = await viewpure.getter();
    expect(age).to.equal(20);
  });

  // it("Should not be able to access private function", async function () {
  //   expect(viewpure.getName).to.throw("cannot access private function");
  // });

  // it("Should increment the age by 1", async function () {
  //   await viewpure.incrementage();
  //   expect(await viewpure.getter()).to.equal(21);
  // });

  it("Should decrement the age by 1", async function () {
    await viewpure.decrementtage();
    expect(await viewpure.getter()).to.equal(9);
  });

  it("Should return the correct score", async function () {
    expect(await viewpure.getScore()).to.equal(30);
  });

  it("Should return the correct marks", async function () {
    expect(await viewpure.marks()).to.equal(10);
  });
});
