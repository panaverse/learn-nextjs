import { expect } from "chai";
import { ethers } from "hardhat";

describe("payEther", function () {
  let payEther: any;

  beforeEach(async function () {
    const PayEther = await ethers.getContractFactory("payEther");
    payEther = await PayEther.deploy();
    await payEther.deployed();
  });

  it("should receive Ether", async function () {
    const initialBalance = await payEther.getBalance();
    const amountToSend = ethers.utils.parseEther("1");
    await payEther.getEther({ value: amountToSend });
    const newBalance = await payEther.getBalance();
    expect(newBalance).to.equal(initialBalance.add(amountToSend));
  });
});
