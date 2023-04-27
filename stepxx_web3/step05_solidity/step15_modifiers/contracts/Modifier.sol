// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Modifier {
    address public owner;

    // Modifier to allow only the contract owner to execute a function
    modifier onlyBy() {
        require(msg.sender == owner, "Only contract owner can call this function.");
        _; // Continue execution
    }

    constructor() {
        owner = msg.sender;
    }

    // Function that can only be called by the contract owner
    function doSomething() public onlyBy {
        // Code to be executed
    }
}
