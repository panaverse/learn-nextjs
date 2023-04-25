// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract MemoryvsStorage{

    string[] public student=['hira','javeria','fizza'];

    function mem () public view{
        string[] memory s1= student;
        s1[0]='amna';
    }

    function stor () public{
        string[] storage s1= student;
        s1[0]='amna';
    }
}
