// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract EventExample {
    event NumberIncreased(uint newValue); // event declaration
    
    uint public number;

    function increaseNumber(uint _value) public {
        number += _value;
        emit NumberIncreased(number); // raising event
    }
}
