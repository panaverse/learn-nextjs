import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Mapping", function () {
  let mapping: Contract;

  beforeEach(async function () {
    const Mapping = await ethers.getContractFactory("Mapping");
    mapping = await Mapping.deploy();
    await mapping.deployed();
  });

  it("Should set and get mapping value correctly", async function () {
    await mapping.setter(1, "Wania");
    const result = await mapping.rollNo(1);
    expect(result).to.equal("Wania");
  });

  it("Should set and get value in mapping with struct", async function () {
    await mapping.mappingWithStruct(1, "Zorain", 12);
    const result = await mapping.data(1);
    expect(result.name).to.equal("Zorain");
    expect(result.class).to.equal(12);
  });
});
