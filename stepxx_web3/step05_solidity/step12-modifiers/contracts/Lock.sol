// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Modifiers {
    address owner;

    modifier ownerChanges() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function changeOwner(address newOwner) public onlyOwner ownerChanges {
        owner = newOwner;
    }
}
