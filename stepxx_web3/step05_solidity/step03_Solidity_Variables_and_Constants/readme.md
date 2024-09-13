## Solidity Variables and Constants

In Solidity, variables are used to store data that can be manipulated or changed during the execution of a smart contract, while constants are used to store data that cannot be changed.

### Variables

Variables in Solidity are declared using the `var` or data type keyword, followed by the variable name. For example:

```
uint256 myUint = 123;
bool myBool = true;
address myAddress = 0x1234567890123456789012345678901234567890;
```

Once a variable is declared, its value can be changed using the assignment operator `=`. For example:

```
myUint = 456;
```

Solidity also supports arithmetic and logical operations on variables, such as addition (`+`), subtraction (`-`), multiplication (`*`), division (`/`), and modulus (`%`). For example:

```
uint256 a = 5;
uint256 b = 2;
uint256 c = a + b; // c is now 7
```

### Constants

Constants in Solidity are declared using the `constant` keyword, followed by the data type and variable name. For example:

```
uint256 constant MY_CONST = 123;
```

Once a constant is declared, its value cannot be changed. Constants are typically used to store values that are known at compile time and do not need to be modified during the execution of a smart contract.

### Example

Here's an example that demonstrates the use of variables and constants in a Solidity contract:

```
pragma solidity ^0.8.0;

contract MyContract {
    uint256 public myUint = 123;
    bool public myBool = true;
    address public myAddress = 0x1234567890123456789012345678901234567890;
    uint256 constant MY_CONST = 456;

    function setMyUint(uint256 _myUint) public {
        myUint = _myUint;
    }

    function getMyUint() public view returns (uint256) {
        return myUint;
    }

    function doSomething() public {
        myUint = myUint + MY_CONST;
    }
}
```

In this example, we've defined a Solidity contract called `MyContract` that includes both variables and a constant. We've defined a `myUint` variable that can be changed using the `setMyUint()` function, and a `getMyUint()` function that allows us to retrieve the current value of `myUint`.

We've also defined a `doSomething()` function that modifies the value of `myUint` by adding the value of the `MY_CONST` constant.

By using variables and constants, we can create smart contracts that are both flexible and secure, ensuring that data is stored and manipulated correctly and consistently.
