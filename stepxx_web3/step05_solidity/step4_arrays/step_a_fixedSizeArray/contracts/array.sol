// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Array {
   uint[4] public arr = [10, 20, 30, 40]; //here we define the datatype of an array and then declare number of elements are going to be in our array i.e uint[4] 4 elements in our array then access modifier, then array name and then its value

   function setValue(uint index, uint value) public
    {
        arr[index] = value;
    }

    function getArr(uint index) public view 
    {
        console.log("Arr is: ",arr[index]);
    }

    function lengthArr() public view returns (uint)
    {
        return arr.length;
    }


}
