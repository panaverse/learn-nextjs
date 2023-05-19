// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract payEther {
    address payable sendadd =
        payable(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);

    // Functions declared with the payable keyword have the ability to accept Ether from the caller. The call will fail if Ether is not provided by the sender.
    function getEther() public payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    /* - <address>.transfer(uint 256) Its sends given amount of wei to address 
        and throws an exception in the event of failture 
      - <address>.send(uint256 amount) returns (bool): This function sends the 
       given amount of wei to address and returns false in the event of failure.  
    */
    function sendEther() public {
        sendadd.transfer(1 ether);
    }
}
