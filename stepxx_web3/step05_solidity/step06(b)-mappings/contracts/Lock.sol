// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract mappings {
    mapping(uint => string) public roll_no;

    function setter(uint keys, string memory value) public {
        roll_no[keys] = value;
    }

    struct Student {
        string name;
        uint class;
    }
}
