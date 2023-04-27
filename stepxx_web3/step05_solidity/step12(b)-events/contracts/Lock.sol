// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Events {
    event LogThis(string message); // declare an event

    function test() public {
        // emit event
        emit LogThis("hello world");
    }
}
