// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ParentContract {
    string internal message;

    function setMessage(string memory _message) public {
        message = _message;
    }
}

/*-------------- single inheritance -----------*/
// child contract is inherit from parent contract and can access parents contract functions and state variable which are not private
contract ChildContract is ParentContract {
    uint public number = 9;

    // return parent contract state variable
    function getMessage() public view returns (string memory) {
        return message;
    }

    function getNumber() public view returns (uint) {
        return number;
    }
}

/*-------------- Multilevel inheritance -----------*/
contract ThirdChildContract is ChildContract {
    function getMsg() public view returns (string memory) {
        return message;
    }
}
