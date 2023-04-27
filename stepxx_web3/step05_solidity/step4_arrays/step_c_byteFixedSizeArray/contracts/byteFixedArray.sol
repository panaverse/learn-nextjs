// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "hardhat/console.sol";

contract ByteFixedArray {
    bytes2 public arr2; //2 bytes array
    bytes3 public arr3; //3 bytes array

    function setByteArray(bytes2 item1, bytes3 item2) public
    {
        arr2 = item1;
        arr3 = item2;
    }

    function getByteArray() public view
    {
        bytes2 arr2Copy = arr2;
        bytes3 arr3Copy = arr3;

        console.log("Value of byte array 2 at each index: ");
        for (uint i = 0; i < arr2Copy.length; i++) {
            console.logBytes1(arr2Copy[i]); //console.logBytes1 is a function provided by the hardhat/console.sol library that allows you to log a single byte of a bytes variable to the console. It takes a single parameter, which is the byte to be logged.
        }

        console.log("Value of byte array 3 at each index: ");
        for (uint i = 0; i < arr3Copy.length; i++) {
            console.logBytes1(arr3Copy[i]);
        }
    }   

}
