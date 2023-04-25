// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract viewpure {
    uint age = 10;

    function getter() public view returns (uint) {
        // age=age+1
        return age;
    }

    function setter(uint newage) public {
        age = newage;
    }
}
