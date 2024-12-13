## Solidity Libraries

In Solidity, a library is a reusable piece of code that can be deployed independently and can be called by other contracts or libraries. Libraries are similar to contracts, but they cannot be deployed on their own and do not have their own storage.

### Creating a Library

To create a library in Solidity, you simply define a contract using the `library` keyword. The contract can contain functions that can be called by other contracts. Here is an example of a simple library that contains a function to calculate the factorial of a number:

```solidity
library Math {
  function factorial(uint256 n) public pure returns (uint256) {
    if (n == 0) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }
}
```

In this example, we have defined a library called `Math` that contains a single function called `factorial`. The function takes an unsigned integer `n` as an argument and returns its factorial.

Note that we have declared the function as `public` and `pure`. `public` makes the function callable from other contracts, and `pure` indicates that the function does not read or modify the state of the contract.

### Using a Library

To use a library in another contract, you need to import it using the `import` statement. Here is an example of how to use the `Math` library we defined earlier:

```solidity
pragma solidity ^0.8.0;

import "./Math.sol";

contract MyContract {
  function calculateFactorial(uint256 n) public pure returns (uint256) {
    return Math.factorial(n);
  }
}
```

In this example, we have imported the `Math` library using the `import` statement. We can then call the `factorial` function of the `Math` library in the `calculateFactorial` function of our contract.

Note that we have used the dot notation to call the `factorial` function of the `Math` library.

### Deploying a Library

To deploy a library, you simply compile and deploy the contract as you would with any other contract. However, since libraries cannot be deployed on their own, you will need to include them in another contract that calls the library functions.
