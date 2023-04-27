// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";


//  WE WILL CREATE MULTIPLE CONTRACTS HERE: 
contract Visibility {
   function f1() public pure returns(uint) //available outside 
   {
    return 1;
   }
   function f2() private pure returns(uint) //not available outside
   {
    return 2;
   }
   function f3() internal pure returns(uint) //not available outside
   {
    //uint a = f4(); //will give an error as f4 is not availble inside the contract
    uint a = f2(); //availble inside so no error
    return 3;
   }
   function f4() external pure returns(uint) //available outside, unavailable inside
   {
    return 4;
   }
}

contract DriveContract is Visibility
{
    //uint public aa = f2(); //it will give an error as it is trying to access the private function that is availble only within the contract
    uint public bb = f1(); //no error - available
    uint public cc = f3(); //only available if the class is drive class
    //uint public dd = f4(); //show error - because f4() is already inherited and f4() can't be access within the contract so we can't access f4() here as it is in our contract 
}

contract OtherContract
{
    //creating an object in solidity
    Visibility obj = new Visibility();
    uint public ee = obj.f4(); //call f4() through obj of contract visibility
    uint public ff = obj.f1();
    //uint public ee = obj.f2(); //will give an error
    //uint public ee = obj.f3(); //will give an error
}

//WITHIN CONTRACT AVAILABILITY:
//PUBLIC - available
//PRIVATE - available
//INTERNAL - available
//EXTERNAL - unavailable

//WITHIN DRIVE CONTRACT AVAILABILITY:
//PUBLIC - available
//PRIVATE - unavailable
//INTERNAL - available
//EXTERNAL - unavailable

//OTHER CONTRACT AVAILABILITY:
//PUBLIC - available
//PRIVATE - unavailable
//INTERNAL - unavailable
//EXTERNAL - available