// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract DynamicArray {

    uint[] public arr;

    function getArr(uint index) public view 
    {
        console.log("Array at ",index," index is: ",arr[index]);
    }
    function pushElement(uint item) public 
    {
        arr.push(item);
        // return arr[index];
    }

    function lengthArr() public view returns (uint)
    {
        return arr.length;
    }

    function popElement() public 
    {
        arr.pop();
    }
}
