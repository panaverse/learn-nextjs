// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Variables {
    // Additional Qualifiers of State variables

    /* By default var are internal 
        It can only be access by contract and its contract that inherits from it
        It can only read from outside
    */
    int internal StateVariable;

    /* Private can only be used in contracts containing them. They cannot
    be used even within derived contracts.
   */
    int private privateStateVariable;

    // The Solidity compiler generates a getter function for each public state variable. External access.
    int public stateIntVariable;

    // It makes variable immutable. The value must be assigned to the variable at declaration time. I
    bool constant hasIncome = true;
}

