# Debugging with Hardhat Network

When running your contracts and tests on Hardhat Network you can print logging messages and contract variables calling console.log() from your Solidity code. To use it you have to import hardhat/console.sol in your contract code.

This is what it looks like:

```
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Token {
  uint age = 20;

  function getage()public{
    console.log(age)
  }
}
```
