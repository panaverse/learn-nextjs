// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Variable {
    //STATE VARIABLE:
    //State variables are declare at contract level and permanantly store in contract storage
    uint age; //default value is 0 - no concept of null/none in solidity
    //age = 10; //this gives an error because we can't initialize state variable like this


    //Properties:
    //1. It store permanantly in the blockchain and for that we have to pay gas fee
    //2. Storage not dynamically allocated means when you allocate new state variable you have to compile program again as it doesnot compile dynamically
    //3. Instance of the contract cannot have

    //Public state variable 
    uint public salary; //public state variables automatically create get function for that variable through which we can access their value



    //Methods to initialize state variable:
    //1. Intialize when declaring:
    uint num = 2;

    //2. Create constructor and then assign value to state variable
    constructor()
    {
        salary = 10000;

    }

    //3. Create a setter function of state variable:
    uint8 public count;
    function stateVar() public returns(uint8)
    {
        count =  1;
        console.log("Count Value is: ", count);
        return count;
    }


    //LOCAL VARIABLE:
    //Local variables are declare inside function body.
    //They are store in stack instead of contract storage as state variables are store in contract storage.
    //Don't cost gas
    //There are some types that reference to the contract storage by default.
    //Memory keyword can't be use at contract level

    function localVar() pure public returns(uint8)
    {
        //There are some data types that always store in contract storage like string, struct, array, mapping etc.
        //string stateVarString = "Wania";  //This is declare inside function but it will be store on contract storage by default. To use it inside the function we need to use KEYWORD "memory"
        //string memory localVarString = "Kazmi"; //Now it is store in our memory nor in stack nor in contract storage

        uint8 localVarValue = 20; //it store in stack not in contract storage
        // console.log("Local Variable Value is" , localVarValue); //cannot console as our function is pure.
        return localVarValue;
    } //pure means it doesnot change our state variable neither it read our state variable means pure function doesnot read and write state variable
     
}
