// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract demo{

    function demso() public view returns(uint block_no, uint timestamp, address msgSender){
        return(block.number, block.timestamp, msg.sender);
    }
}
