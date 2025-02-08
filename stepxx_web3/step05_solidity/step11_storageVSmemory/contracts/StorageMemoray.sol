// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract StorageMemoray {
    //We will see the encouter problems if we don't use storage and memory correctly.

    string[] public students = ["Wania", "Arzak", "Zarnab"];

    function memoryFun() public view 
    {
        string[] memory s1 = students;
        s1[0] = "Zain"; //it create a copy of array so if we make changes into copy array it doesnot reflect to the original array
    }

    function storageFun() public 
    {
        string[] storage s1 = students;
        s1[0] = "Zain"; //it doesnot create the copy of original array but rather create a reference type of so if we make change in it, it will reflect in original array.
    }
}
