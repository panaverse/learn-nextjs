## Solidity Inheritance

Solidity supports the concept of inheritance, which allows a contract to inherit properties and functions from another contract. Inheritance is a powerful feature that can be used to create modular and extensible smart contracts.

### Single Inheritance

In Solidity, a contract can inherit from a single base contract using the `is` keyword. For example, consider the following contract:

```
pragma solidity ^0.8.0;

contract Ownable {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
}

contract MyContract is Ownable {
    // Additional contract code
}
```

In this example, the `MyContract` contract inherits from the `Ownable` contract using the `is` keyword. This means that the `MyContract` contract will have access to the `owner` variable and `onlyOwner` modifier defined in the `Ownable` contract.

### Multiple Inheritance

Solidity also supports multiple inheritance, which allows a contract to inherit from multiple base contracts. To inherit from multiple base contracts, separate the base contracts with commas. For example:

```
pragma solidity ^0.8.0;

contract A {
    function foo() public pure returns (string memory) {
        return "A";
    }
}

contract B {
    function foo() public pure returns (string memory) {
        return "B";
    }
}

contract C is A, B {
    // Additional contract code
}
```

In this example, the `C` contract inherits from both the `A` and `B` contracts. If the `C` contract calls the `foo()` function, it will return the string "B", since the `B` contract is listed after the `A` contract in the inheritance hierarchy.

### Overriding Inherited Functions

Inherited functions can be overridden in the derived contract by defining a new function with the same name and signature. For example:

```
pragma solidity ^0.8.0;

contract A {
    function foo() public pure returns (string memory) {
        return "A";
    }
}

contract B is A {
    function foo() public pure virtual returns (string memory) {
        return "B";
    }
}

contract C is B {
    function foo() public pure override returns (string memory) {
        return "C";
    }
}
```

In this example, the `B` contract overrides the `foo()` function defined in the `A` contract by defining a new function with the same name and signature. The `C` contract then overrides the `foo()` function defined in the `B` contract by defining a new function with the same name, signature, and the `override` keyword.

### Example

Here's an example that demonstrates the use of inheritance in Solidity:

```
pragma solidity ^0.8.0;

contract Ownable {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
}

contract Token {
    mapping(address => uint256) public balances;

    function transfer(address to, uint256 amount) public {
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}

contract MyToken is Token, Ownable {
    string public name;

    constructor(string memory _name) {
        name = _name;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        balances[to] += amount;
    }
}
```
