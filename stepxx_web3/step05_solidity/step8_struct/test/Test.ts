import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Struct", function () {
  let struct: Contract;

  beforeEach(async function () {
    const Struct = await ethers.getContractFactory("Struct");
    struct = await Struct.deploy(102, "Wania");
    await struct.deployed();
  });

  it("Should get initial student details correctly - get values", async function () {
    const result = await struct.s1();
    expect(result.rollNo).to.equal(102);
    expect(result.name).to.equal("Wania");
  });

  it("Should update student details correctly", async function () {
    await struct.setter(104, "Arzak");
    
    const result = await struct.s1(); //getter function that is automatically created
    expect(result.rollNo).to.equal(104);
    expect(result.name).to.equal("Arzak");
  });

});