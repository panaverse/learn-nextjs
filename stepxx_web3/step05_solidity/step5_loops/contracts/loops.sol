// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Loops {
    uint[3] public arr;

    //while loop - we have to writes loops inside a function
    uint public count;

    function whileLoop() public
    {
        while(count < arr.length)
        {
            arr[count] = count;
            count++;
        }
    }

    function forLoop() public 
    {
        for(uint i = count; i < arr.length; i++)
        {
            arr[count] = count;
            count++;
        }
    }

    function doWhileLoop() public
    {
        do{
            arr[count] = count;
            count++;
        }while(count < arr.length);
    }
}
