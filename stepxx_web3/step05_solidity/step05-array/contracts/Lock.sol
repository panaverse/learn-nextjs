// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract arraycontract {
    uint[4] public arr = [10, 20, 30, 40];

    uint[] public arr1;

    function setter(uint index, uint value) public {
        arr[index] = value;
    }

    function length() public view returns (uint) {
        return arr.length;
    }

    function pushElement(uint item) public {
        arr1.push(item);
    }

    function popElement() public {
        arr1.pop();
    }

    // static byte array
    bytes2 public b2;
    bytes3 public b3;

    function setbyte() public {
        // a=61
        // b=62
        // c=63 ...

        b2 = "ab";
        b3 = "abc"; // '616263'
    }

    // Dynamic byte array
    bytes public b1 = "abc";

    function pushElementbyte() public {
        b1.push("d");
    }
}
