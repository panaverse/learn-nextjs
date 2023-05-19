// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract viewpure {
    uint age = 10;
    string name = "hira";
    uint score = 30;

    // public functions can be called internally and externally
    function getter() public view returns (uint) {
        return age;
    }

    function setter(uint newage) public {
        age = newage;
    }

    // only contract can access private function
    function getName() private pure returns (string memory) {
        string memory names = " javeria";
        return names;
    }

    // by default every function is internal. It can only be acces by contract and any contract that inherits it
    function incrementage() internal {
        age = age + 1;
    }

    // This visibility makes functions accessible directly externally, but not internally
    function decrementtage() external {
        age = age - 1;
    }

    /* These functions do not have the ability to modify the state of a
blockchain. They can read the state variables and return to the caller, but they
cannot modify any variable, invoke an event, create another contract, call other
functions that can change state, and so on. */

    // view is an alias of constant. we can return state variable but can not change them
    function getScore() public view returns (uint) {
        return score;
    }

    // In Pure, we can not read or write state variable, we can read, write and return local variables
    function marks() public pure returns (uint) {
        uint mark = 10;
        return mark;
    }
}
