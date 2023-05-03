import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lottery", function () {
  let Lottery;
  let lottery: any;
  let owner;
  let addr1: any;
  let addr2: any;
  let addrs;

  beforeEach(async function () {
    Lottery = await ethers.getContractFactory("Lottery");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    lottery = await Lottery.deploy();
    await lottery.deployed();
  });

  it("Should allow players to participate", async function () {
    // Participants should be able to send 2 ether to the contract
    await lottery.connect(addr1).sendTransaction({
      value: ethers.utils.parseEther("2"),
    });
    await lottery.connect(addr2).sendTransaction({
      value: ethers.utils.parseEther("2"),
    });
    // Check that there are two participants
    const players = await lottery.getPlayers();
    expect(players).to.have.lengthOf(2);
    expect(players[0]).to.equal(addr1.address);
    expect(players[1]).to.equal(addr2.address);
  });

  it("Should select a winner and transfer the balance", async function () {
    // Participants should be able to send 2 ether to the contract
    await lottery.connect(addr1).sendTransaction({
      value: ethers.utils.parseEther("2"),
    });
    await lottery.connect(addr2).sendTransaction({
      value: ethers.utils.parseEther("2"),
    });
    // Manager should be able to select a winner
    await lottery.selectWinner();
    // Check that the balance has been transferred to the winner
    const winnerBalance = await ethers.provider.getBalance(addr1.address);
    expect(winnerBalance).to.equal(ethers.utils.parseEther("4"));
    // Check that the participants array has been reset
    const players = await lottery.getPlayers();
    expect(players).to.have.lengthOf(0);
  });
});
