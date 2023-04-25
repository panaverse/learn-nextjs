// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Enums {
    enum user {
        allowed,
        not_allowed,
        wait
    }

    user public u1 = user.allowed;
    uint public lottery = 1000;

    function owners() public {
        if (u1 == user.not_allowed) {
            lottery = 0;
        }
    }

    function changeOwner() public {
        u1 = user.not_allowed;
    }
}
