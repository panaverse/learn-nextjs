# state variable

permanently store variable in blockchai, declare outside of function and require gas fees.
unit age;
automatically values saves in this variable
To change value of state variable:

- using the contracts constructor.
- initializing the variable at declaration
- using the setter function.

# local variable

these variable store in stack not in contract storage
string name="hira"
this name variable cannot store in stack and if we want to declare in function we will add memory to store it in memory.
string memory name="hira

Points:

- Dont't cost gas.
- memory keyword can not be used at contract
- by default varible is private

- A data type helps us determine the memory requirements for the variable

# Integers

Int:
Range - int8 to int256 (int alias to int256)
int8: -128 to +127

Uint:
Range - uint8 to uint256 (uint alias to uint256)

overflow detected at compile time
if transaction overflows it will not execute

# Boolean

by default value store in boolean type is false

npm init --y
npm install --save-dev hardhat
npx hardhat

npm install @nomicfoundation/hardhat-toolbox
npm install --save-dev ts-node
npm install --save-dev typescript
npm install --save-dev chai
npm install --save-dev ethers
npm install --save-dev typechain
npx hardhat compile
npx hardhat test
