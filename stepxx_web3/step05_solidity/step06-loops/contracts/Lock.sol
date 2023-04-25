// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract loopscontract {
    uint[3] public arr;
    uint counts;

    function loopone() public {
        uint i = 0;
        while (i < 3) {
            arr[i] = i;
            i++;
        }
    }

    function looptwo() public {
        for (uint i = 0; i < arr.length; i++) {
            arr[counts] = counts;
            counts++;
        }
    }
}
