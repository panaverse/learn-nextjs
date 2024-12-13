  import { expect } from "chai";
  import { ethers } from "hardhat";


  describe("Identity", function () {
    it("Should return the name and age", async function () {
      const Identity = await ethers.getContractFactory("Identity");
      const identity = await Identity.deploy();
      await identity.deployed();

      expect(await identity.getName()).to.equal("Wania");
      expect(await identity.getAge()).to.equal(55);
    });
  });