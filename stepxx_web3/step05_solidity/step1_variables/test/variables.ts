import { expect } from "chai";
import { ethers } from "hardhat";

describe("Variable", function () {
  let variable:any;

  beforeEach(async function () {
    const VariableFactory = await ethers.getContractFactory("Variable");
    variable = await VariableFactory.deploy();
    await variable.deployed();
  });

  it("should initialize public state variable `salary` correctly", async function () {
    const salary = await variable.salary();
    expect(salary).to.equal(10000);
  });

  it("should return the correct value from `stateVar` function", async function () {  
     await variable.stateVar();
     const result = await variable.count();
     expect(result).to.equal(1);


  });

  it("should return the correct value from `localVar` function", async function () {
    const localVarValue = await variable.localVar();
    expect(localVarValue).to.equal(20);
  });
});