// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

struct Student {
    uint roll;
    string name;
}

contract Structure {
    Student public s1;

    constructor(uint _roll, string memory _name) {
        s1.roll = _roll;
        s1.name = _name;
    }

    function change(uint _roll, string memory _name) public {
        Student memory new_student = Student({roll: _roll, name: _name});
        s1 = new_student;
    }
}
