// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract bytesDynamicArray {
    bytes public dynamicArr = "abc";

    function pushElement() public
    {
        dynamicArr.push("d");
    }

    function getDynamicArr() public view 
    {
        console.log("Value of dynamic Array at each index: ");
        for(uint i = 0; i < dynamicArr.length; i++){
            console.logBytes1(dynamicArr[i]);
        }
    }

    function getElement(uint i) public view returns(bytes1)
    {
        return dynamicArr[i];
    }
}
