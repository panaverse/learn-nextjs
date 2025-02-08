// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Bool {
    bool public value = true;
    function checkBool(uint num) public returns(bool)
    {
        if(num > 100)
        {
            value = true;
            return value;
        }
        else
        {
            value = false;
            return value;
        }
    }
}
