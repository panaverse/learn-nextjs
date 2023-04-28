// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract gettersetter {
    uint age = 10;

    function getter() public view returns (uint) {
        return age;
    }

    function setter(uint newage) public {
        age = newage;
    }
}
