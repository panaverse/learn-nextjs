// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract IfElse {
    function checkValue(int num) public pure returns(string memory)
    {
        string memory value;
        if(num > 0){
            value = "Number is greater than 0";
        }
        else if(num < 0){
            value = "Number is less than 0";
        }
        else{
            value = "Number is equal to 0";
        }
        return value;
    }
    
}
