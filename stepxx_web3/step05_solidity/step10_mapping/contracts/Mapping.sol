// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Mapping {
    //BASIC STRUCTURE
    //initialize mapping
    mapping(uint => string) public rollNo;

    function setter(uint key, string memory value) public 
    {
        rollNo[key] = value; //assigning key and value just like in array but mapping are way different than array. What is difference between mapping and array - check readme
    }

    //MAPPING WITH STRUCT
    struct Student {
        string name;
        uint class;
    }

    mapping(uint=>Student) public data;
    function mappingWithStruct(uint _rollNo, string memory _name, uint _class) public 
    {
        data[_rollNo] = Student(_name, _class);
    }
}
