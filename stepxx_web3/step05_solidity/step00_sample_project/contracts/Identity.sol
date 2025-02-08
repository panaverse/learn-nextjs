// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Identity {
    string name;
    uint age;

    constructor() 
    {
        name = "Wania";
        age = 55;
    }

     function getName() view public returns(string memory)
    {
        console.log("Name is: ", name);
        return name;
    }

    function getAge() view public returns(uint)
    {
        console.log("Age is: ", age);
        return age;
    }

}
   
