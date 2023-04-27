// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract modifiers {
    
    address public owner;
    
    constructor() {
        owner = msg.sender; // assigning address of the contract to owner variable
    }
    
    // add modifier to check if owner of this contract is change owner address
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner of this contract.");
        _;
    }
    
    function updateOwner(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }
}
