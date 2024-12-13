// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";


//    Struct can be created inside the contract storage as well as outside the contract storage 
//    If you create Struct outside then multiple contracts can access it. 
//   Struct created inside the contract can be accessible to only that contract

struct Student 
{
    uint rollNo;
    string name;
}

contract Struct {
    Student public s1; //datatype, visibility, name of variable
    constructor(uint _rollNo, string memory _name)
    {
        s1.rollNo = _rollNo;
        s1.name = _name;
    }

    function setter(uint _rollNo, string memory _name) public
    {
        Student memory new_student = Student({
            rollNo: _rollNo,
            name: _name
        });
        s1 = new_student;
    }
}
