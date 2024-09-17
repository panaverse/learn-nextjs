// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Functions {
    //How Function works
    //Syntax of function
    //what rules should be follow while creating a function

    uint age = 10; // we will set and get the value of this state variable

    //creating a function: 
    //syntax - function keyword, function name, parameters () optional, visibility of function i.e public, private etc, function is pure or view, returns a datatype
    //public - this function is available publicly
    //view - you can only read state variable not write

    //no gas fee for getter function as we are not making changes in state variable
    function getter() public view returns(uint)
    {
        console.log("Age value in getter function: ",age);
        return age;
    } 

    //gas fee will require whenever we make changes in our state variable
    function setter() public  //we donot use any view/pure because we are going to modify our state variable - view to read state variable and pure when you donot read and write a state variable
    {
        age = age + 1; 
        // console.log("Age value in setter function: ",age);
    }

    //function with parameters
    function setterAge(uint newage) public //
    {
        age = newage;
        // console.log("Set age value is: ",age);
    }

    //If you create a public state variable then you don't need to create a getter function for it as it is created by default
    function pureFunction() public pure returns(uint)
    {
        uint rollNo = 100;
        // console.log("Roll Number is: ",rollNo);
        return rollNo;
    }
}
