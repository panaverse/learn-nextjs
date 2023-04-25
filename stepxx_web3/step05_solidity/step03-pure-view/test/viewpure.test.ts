import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
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
    // const age = await viewpure.getter();
    expect(viewpure.age).to.equal(20);
  });
});
