// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract GlobalVar {
    function getter() public view returns(uint block_num, uint timestamp, address msgSender)
    {
        console.log("Block number is: ",block.number);
        console.log("Block timestamp is: ",block.timestamp);
        console.log("Contract Owner is: ",msg.sender);
        return (block.number, block.timestamp, msg.sender);
    }
        
}
