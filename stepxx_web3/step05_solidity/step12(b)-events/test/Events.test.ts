import { expect } from "chai";
import { ethers } from "hardhat";

describe("Events", function () {
  it("Should emit LogThis event", async function () {
    const Events = await ethers.getContractFactory("Events");
    const events = await Events.deploy();

    await events.test();
    // typed filter object
    const filter = events.filters.LogThis();
    // console.log(filter);
    // queryFilter function then takes this filter object as an argument and returns the logs that match the filter.
    const logs = await events.queryFilter(filter);
    // console.log(logs);
    expect(logs[0].args.message).to.equal("hello world");
  });
});
