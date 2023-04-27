// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

contract counter {
    uint count = 0;

    function incrementCount() public {
        count = count + 1;
    }

    function getCount() public view returns (uint) {
        return count;
    }

    function resetCount() public {
        count = 0;
    }
}
//0x44B41DF2Db6895855497fCd302C7c57C4213a6d1
