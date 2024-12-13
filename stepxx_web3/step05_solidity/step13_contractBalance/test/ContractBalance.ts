import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

describe("ContractBalance", function () {
  let contract: Contract;

  beforeEach(async function () {
    const ContractBalance: ContractFactory = await ethers.getContractFactory("ContractBalance");
    contract = await ContractBalance.deploy();
    await contract.deployed();
  });

  it("Should receive and display the correct balance", async function () {
    
    const initial_balance = await contract.getBalance();
    const amount_send = ethers.utils.parseEther("1");
    await contract.payEth({value: amount_send});
    const new_Bal = await contract.getBalance();
    expect(new_Bal).to.equal(initial_balance.add(amount_send));
  });
});
