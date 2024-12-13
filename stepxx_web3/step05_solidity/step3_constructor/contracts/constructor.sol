// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

//constructor is a function that executed once when we create our contract 
//constructor is used when we need to initialize our state variable
//constructor is also used when we have to decide the owner of our contract

contract Constructor 
{
    uint count;
    //constructor without argument
    // constructor()
    // {
    //     count = 8; ////now we can't change this value
    // }
    //constructor with argument
    constructor(uint newCount)
    {
        count = newCount;
    }

    function getter() public view returns(uint)
    {
        console.log("Count value is: ",count);
        return count;
    }

}
