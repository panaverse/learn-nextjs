// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract conditions{

    function conditional(int a) public pure returns(string memory){
        string memory value;
        if(a>0){
            value="greater than 0";
        }
        else if(a==0){
            value = "equal to zero";
        }
        else{
            value = "less than zero";
        }
        return value;
    }
}