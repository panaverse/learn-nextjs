import { ethers } from "hardhat";
import { expect } from "chai";

describe("EventExample", function () {
  let eventExample:any;

  beforeEach(async function () {
    const EventExample = await ethers.getContractFactory("EventExample");
    eventExample = await EventExample.deploy();
    await eventExample.deployed();
  });

  it("should emit NumberIncreased event when number is increased", async function () {
    const increaseValue = 10;
    const increaseTx = await eventExample.increaseNumber(increaseValue);
    const increaseTxReceipt = await increaseTx.wait();

    const events = increaseTxReceipt.events;
    expect(events.length).to.equal(1);

    const numberIncreasedEvent = events[0];
    expect(numberIncreasedEvent.event).to.equal("NumberIncreased");
    expect(numberIncreasedEvent.args[0]).to.equal(increaseValue);
  });
});


// It tests that the NumberIncreased event is emitted with the correct value when the increaseNumber function is called with a given value.