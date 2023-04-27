// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";


//Enum can be created outside and inside of contract
//Enum is used when we want to assign name to integral values or constants
//Enum set should be limited 
//Enum increase the readibility of our code.
contract Enum {
    enum user{
        allowed,
        not_allowed,
        wait
    }

    user public u1 = user.allowed;
    uint public lottery = 1000;

    function owner() public 
    {
        if(u1 == user.allowed)
        {
            lottery = 0;  //if user is allowed he can take his lottery amount
        }
    }

    function changeOwner() public returns (user)
    {
        u1 = user.not_allowed;
        return u1;
    }

}
