import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

describe("DriveContract", function () {
  let contract: Contract;
  let visibility: Contract;

  beforeEach(async function () {
    const Visibility: ContractFactory = await ethers.getContractFactory("Visibility");
    visibility = await Visibility.deploy();
    await visibility.deployed();

    const DriveContract: ContractFactory = await ethers.getContractFactory("DriveContract");
    contract = await DriveContract.deploy();
    await contract.deployed();
  });

  it("Should return the correct value of f1", async function () {
    const f1Result = await visibility.f1();
    expect(f1Result).to.equal(1);
  });

  it("Should return an error when trying to access f2", async function () {
    try {
      await visibility.f2();
    } catch (error:any) {
      expect(error.message).to.include("cannot access private function");
      return;
    }
    expect.fail("Expected error not received");
  });

  it("Should return an error when trying to access f3", async function () {
    try {
      await visibility.f3();
    } catch (error:any) {
      expect(error.message).to.include("visibility can only be accessed");
      return;
    }
    expect.fail("Expected error not received");
  });

  it("Should return the correct value of f4 through the DriveContract", async function () {
    const f4Result = await contract.f4();
    expect(f4Result).to.equal(4);
  });

  it("Should return an error when trying to access f2 through the DriveContract", async function () {
    try {
      await contract.f2();
    } catch (error:any) {
      expect(error.message).to.include("cannot access private function");
      return;
    }
    expect.fail("Expected error not received");
  });

  it("Should return an error when trying to access f3 through the DriveContract", async function () {
    try {
      await contract.f3();
    } catch (error:any) {
      expect(error.message).to.include("visibility can only be accessed");
      return;
    }
    expect.fail("Expected error not received");
  });
});

describe("OtherContract", function () {
  let contract: Contract;
  let visibility: Contract;

  beforeEach(async function () {
    const Visibility: ContractFactory = await ethers.getContractFactory("Visibility");
    visibility = await Visibility.deploy();
    await visibility.deployed();

    const OtherContract: ContractFactory = await ethers.getContractFactory("OtherContract");
    contract = await OtherContract.deploy();
    await contract.deployed();
  });

  it("Should return the correct value of f4 through the Visibility object", async function () {
    const f4Result = await visibility.f4();
    expect(f4Result).to.equal(4);
  });

  it("Should return the correct value of f1 through the Visibility object", async function () {
    const f1Result = await visibility.f1();
    expect(f1Result).to.equal(1);
  });

  it("Should return an error when trying to access f2 through the Visibility object", async function () {
    try {
      await visibility.f2();
    } catch (error:any) {
      expect(error.message).to.include("cannot access private function");
      return;
    }
    expect.fail("Expected error not received");
  });

  it("Should return an error when trying to access f3 through the Visibility object", async function () {
    try {
      await visibility.f3();
    } catch (error) {
      expect.fail("Expected error not received");
    }
  });
});
