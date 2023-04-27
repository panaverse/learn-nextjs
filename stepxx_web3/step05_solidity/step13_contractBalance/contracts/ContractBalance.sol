// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ContractBalance {
    //We will create 2 functions and we will transfer ethers to our contract from function 1 and from function 2 we will see how to display balance that we get in our contract.
    //Balance will be transfer through owner's account 

    address payable user = payable(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266); //sending balance to this account
    function payEth() public payable
    {

    }

    function getBalance() public view returns(uint)
    {
        return address(this).balance;  //address is keyword used to store address - it's a datatype, this keyword tells us that fetch the balance from this contract account
    }

    //sending balance to another account
    function sendEtherToAccount() public
    {
        user.transfer(1 ether);
    }
}
