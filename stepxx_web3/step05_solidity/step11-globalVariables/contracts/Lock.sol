// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract globalvar {
    function demso()
        public
        view
        returns (uint block_no, uint timestamp, address msgSender)
    {
        return (block.number, block.timestamp, msg.sender);
    }

    /* Cryptographic global variables
    SHA2(sha256) and SHA3 (keccak 256)
     */
    function CryptoDemo() public pure returns (bytes32, bytes32) {
        return (sha256("r"), keccak256("r"));
    }
}
