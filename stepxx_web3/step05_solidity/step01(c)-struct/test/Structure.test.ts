import { expect } from "chai";
import { ethers } from "hardhat";

describe("Structure", function () {
    let structure:any;

  beforeEach(async function () {
    const Structure = await ethers.getContractFactory("Structure");
    structure = await Structure.deploy(1, "Alice");
    await structure.deployed();
  });

  it("Should initialize with the correct values", async function () {
    const s1 = await structure.s1();
    expect(s1.roll).to.equal(1);
    expect(s1.name).to.equal("Alice");
  });

  it("Should update the student when calling change()", async function () {
    await structure.change(2, "Bob");
    const s1 = await structure.s1();
    expect(s1.roll).to.equal(2);
    expect(s1.name).to.equal("Bob");
  });
});
